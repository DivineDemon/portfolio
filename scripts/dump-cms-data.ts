/**
 * Build-time dump of published CMS rows into src/data/cms.json,
 * plus markdown pages into src/data/pages.json.
 * Keeps Prisma/pg/fs content out of the Cloudflare Worker runtime bundle.
 */
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { PrismaPg } from "@prisma/adapter-pg";
import { config as loadEnv } from "dotenv";
import { PrismaClient } from "../src/generated/prisma/client";

loadEnv({ path: resolve(process.cwd(), ".env") });

const OUT_PATH = resolve(process.cwd(), "src/data/cms.json");
const PAGES_OUT_PATH = resolve(process.cwd(), "src/data/pages.json");
const CONTENT_DIR = resolve(process.cwd(), "docs/content");

function dumpMarkdownPages() {
  const pages: Record<string, string> = {};
  for (const file of readdirSync(CONTENT_DIR)) {
    if (!file.endsWith(".md")) continue;
    pages[file.replace(/\.md$/, "")] = readFileSync(
      join(CONTENT_DIR, file),
      "utf8",
    );
  }
  mkdirSync(dirname(PAGES_OUT_PATH), { recursive: true });
  writeFileSync(
    PAGES_OUT_PATH,
    `${JSON.stringify(pages, null, 2)}\n`,
    "utf8",
  );
  console.log(
    `[dump-cms-data] wrote ${PAGES_OUT_PATH} (pages=${Object.keys(pages).join(",")})`,
  );
}

const clientSelect = {
  clientName: true,
  designation: true,
  company: true,
  content: true,
  feedback: true,
  image: true,
  logo: true,
  companyUrl: true,
} as const;

async function main() {
  dumpMarkdownPages();

  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    if (existsSync(OUT_PATH)) {
      console.log(
        `[dump-cms-data] DATABASE_URL unset; keeping existing ${OUT_PATH}`,
      );
      return;
    }
    throw new Error(
      "DATABASE_URL is required to dump CMS data (no existing src/data/cms.json)",
    );
  }

  const prisma = new PrismaClient({
    adapter: new PrismaPg({ connectionString }),
  });

  try {
    const [blogPosts, projects, workflows, clients] = await Promise.all([
      prisma.blog_posts.findMany({
        orderBy: [{ featured: "desc" }, { publishedAt: "desc" }],
      }),
      prisma.projects.findMany({
        include: { clients: { select: clientSelect } },
        orderBy: [{ featured: "desc" }, { displayOrder: "asc" }],
      }),
      prisma.n8n_workflows.findMany({
        include: { clients: { select: clientSelect } },
        orderBy: [{ featured: "desc" }, { displayOrder: "asc" }],
      }),
      prisma.clients.findMany({
        orderBy: [{ featured: "desc" }, { id: "desc" }],
        select: {
          id: true,
          clientName: true,
          designation: true,
          company: true,
          content: true,
          image: true,
          featured: true,
        },
      }),
    ]);

    const payload = {
      dumpedAt: new Date().toISOString(),
      blogPosts,
      projects,
      workflows,
      clients,
    };

    mkdirSync(dirname(OUT_PATH), { recursive: true });
    writeFileSync(OUT_PATH, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
    console.log(
      `[dump-cms-data] wrote ${OUT_PATH} ` +
        `(blog=${blogPosts.length}, projects=${projects.length}, ` +
        `workflows=${workflows.length}, clients=${clients.length})`,
    );
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error) => {
  console.error("[dump-cms-data] failed:", error);
  process.exit(1);
});
