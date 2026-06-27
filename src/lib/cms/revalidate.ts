import { revalidatePath, revalidateTag } from "next/cache";

export type RevalidatePayload =
  | {
      type: "project";
      slug: string;
    }
  | {
      type: "workflow";
      slug: string;
    }
  | {
      type: "client";
      projectSlugs?: string[];
      workflowSlugs?: string[];
    }
  | {
      type: "page";
      slug: string;
    }
  | {
      type: "blog";
      slug: string;
    };

function revalidateSeoArtifacts(paths: string[]) {
  revalidateTag("seo:sitemap", "max");
  revalidateTag("seo:llms", "max");
  revalidatePath("/llms.txt");
  revalidatePath("/llms-full.txt");
  revalidatePath("/sitemap.xml");
  revalidatePath("/robots.txt");
  paths.push("/llms.txt", "/llms-full.txt", "/sitemap.xml", "/robots.txt");
}

export function handleRevalidation(payload: RevalidatePayload): string[] {
  const paths: string[] = [];

  switch (payload.type) {
    case "project": {
      revalidateTag("cms:projects", "max");
      revalidateTag(`cms:project:${payload.slug}`, "max");
      revalidateSeoArtifacts(paths);
      revalidatePath("/");
      revalidatePath(`/projects/${payload.slug}`);
      paths.push("/", `/projects/${payload.slug}`);
      break;
    }
    case "workflow": {
      revalidateTag("cms:workflows", "max");
      revalidateTag(`cms:workflow:${payload.slug}`, "max");
      revalidateSeoArtifacts(paths);
      revalidatePath("/");
      revalidatePath(`/workflows/${payload.slug}`);
      paths.push("/", `/workflows/${payload.slug}`);
      break;
    }
    case "client": {
      revalidateTag("cms:clients", "max");
      revalidateSeoArtifacts(paths);
      revalidatePath("/");
      paths.push("/");

      if (Array.isArray(payload.projectSlugs)) {
        for (const slug of payload.projectSlugs) {
          if (typeof slug === "string" && slug.trim()) {
            const projectPath = `/projects/${slug}`;
            revalidateTag(`cms:project:${slug}`, "max");
            revalidatePath(projectPath);
            paths.push(projectPath);
          }
        }
      }

      if (Array.isArray(payload.workflowSlugs)) {
        for (const slug of payload.workflowSlugs) {
          if (typeof slug === "string" && slug.trim()) {
            const workflowPath = `/workflows/${slug}`;
            revalidateTag(`cms:workflow:${slug}`, "max");
            revalidatePath(workflowPath);
            paths.push(workflowPath);
          }
        }
      }
      break;
    }
    case "page": {
      revalidateTag("cms:pages", "max");
      revalidateTag(`cms:page:${payload.slug}`, "max");
      revalidateSeoArtifacts(paths);
      revalidatePath(`/${payload.slug}`);
      paths.push(`/${payload.slug}`);
      break;
    }
    case "blog": {
      revalidateTag("cms:blog", "max");
      revalidateTag(`cms:blog:${payload.slug}`, "max");
      revalidateSeoArtifacts(paths);
      revalidatePath("/blog");
      revalidatePath(`/blog/${payload.slug}`);
      paths.push("/blog", `/blog/${payload.slug}`);
      break;
    }
  }

  return paths;
}
