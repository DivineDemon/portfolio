/**
 * Compile content/** MDX (+ workflow JSON sidecars) into src/data/*.json
 * for the Worker-safe static data layer. No database.
 */
import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  writeFileSync,
} from "node:fs";
import { join, resolve } from "node:path";
import matter from "gray-matter";

const root = resolve(process.cwd());
const contentRoot = join(root, "content");
const dataDir = join(root, "src/data");

function listMdx(dir: string): string[] {
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => join(dir, f))
    .sort();
}

function readMdx(filePath: string) {
  const raw = readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  return { data: data as Record<string, unknown>, body: content.trim() };
}

function compilePages() {
  const pages: Record<string, string> = {};
  for (const file of listMdx(join(contentRoot, "pages"))) {
    const base = file.split("/").pop();
    if (!base) continue;
    const slug = base.replace(/\.mdx$/, "");
    pages[slug] = readMdx(file).body;
  }
  return pages;
}

function compileBlog() {
  return listMdx(join(contentRoot, "blog")).map((file) => {
    const { data, body } = readMdx(file);
    return {
      ...data,
      content: body,
    };
  });
}

function compileProjects() {
  return listMdx(join(contentRoot, "case-studies/projects")).map((file) => {
    const { data } = readMdx(file);
    const client = (data.client as Record<string, unknown> | null) ?? null;
    const { client: _c, ...rest } = data;
    return {
      ...rest,
      clients: client,
    };
  });
}

function compileWorkflows() {
  const dir = join(contentRoot, "case-studies/workflows");
  return listMdx(dir).map((file) => {
    const { data } = readMdx(file);
    const client = (data.client as Record<string, unknown> | null) ?? null;
    const workflowJsonFile = String(data.workflowJsonFile ?? "");
    const workflowJson = workflowJsonFile
      ? JSON.parse(readFileSync(join(dir, workflowJsonFile), "utf8"))
      : (data.workflowJson ?? null);
    const {
      client: _c,
      workflowJsonFile: _f,
      workflowJson: _w,
      ...rest
    } = data;
    return {
      ...rest,
      clients: client,
      workflowJson,
    };
  });
}

function compileTestimonials() {
  return listMdx(join(contentRoot, "testimonials")).map((file) => {
    const { data, body } = readMdx(file);
    return {
      id: Number(data.order ?? 0),
      clientName: String(data.clientName ?? ""),
      designation: String(data.designation ?? ""),
      company: String(data.company ?? ""),
      content: body || String(data.content ?? ""),
      image: (data.image as string | null) ?? null,
      featured: Boolean(data.featured),
    };
  });
}

function main() {
  mkdirSync(dataDir, { recursive: true });

  const pages = compilePages();
  writeFileSync(
    join(dataDir, "pages.json"),
    `${JSON.stringify(pages, null, 2)}\n`,
    "utf8",
  );

  const cms = {
    dumpedAt: new Date().toISOString(),
    source: "content/**/*.mdx",
    blogPosts: compileBlog(),
    projects: compileProjects(),
    workflows: compileWorkflows(),
    clients: compileTestimonials(),
  };
  writeFileSync(
    join(dataDir, "cms.json"),
    `${JSON.stringify(cms, null, 2)}\n`,
    "utf8",
  );

  console.log(
    `[compile-content] pages=${Object.keys(pages).length} ` +
      `blog=${cms.blogPosts.length} projects=${cms.projects.length} ` +
      `workflows=${cms.workflows.length} clients=${cms.clients.length}`,
  );
}

main();
