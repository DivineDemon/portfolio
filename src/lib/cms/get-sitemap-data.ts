import { cacheLife, cacheTag } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function getSitemapData() {
  "use cache";
  cacheTag(
    "seo:sitemap",
    "seo:llms",
    "cms:projects",
    "cms:workflows",
    "cms:pages",
    "cms:blog",
  );
  cacheLife("hours");

  const [projects, workflows, pages, blogPosts] = await Promise.all([
    prisma.projects.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
      orderBy: { updatedAt: "desc" },
    }),
    prisma.n8n_workflows.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
      orderBy: { updatedAt: "desc" },
    }),
    prisma.pages.findMany({
      where: {
        published: true,
        NOT: [
          { pageType: "service" },
          { slug: "services" },
          { slug: { startsWith: "services/" } },
          { pageType: "now" },
          { slug: "now" },
          { pageType: "process" },
          { slug: "process" },
        ],
      },
      select: { slug: true, updatedAt: true },
      orderBy: { updatedAt: "desc" },
    }),
    prisma.blog_posts.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
      orderBy: { updatedAt: "desc" },
    }),
  ]);

  return {
    projects,
    workflows,
    pages,
    blogPosts,
  };
}
