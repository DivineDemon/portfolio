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
    "cms:settings",
    "cms:blog",
    "cms:lead_magnets",
  );
  cacheLife("hours");

  const [projects, workflows, pages, blogPosts, leadMagnets, settings] =
    await Promise.all([
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
        where: { published: true },
        select: { slug: true, updatedAt: true },
        orderBy: { updatedAt: "desc" },
      }),
      prisma.blog_posts.findMany({
        where: { published: true },
        select: { slug: true, updatedAt: true },
        orderBy: { updatedAt: "desc" },
      }),
      prisma.lead_magnets.findMany({
        where: { published: true },
        select: { slug: true, updatedAt: true },
        orderBy: { updatedAt: "desc" },
      }),
      prisma.site_settings.findUnique({
        where: { id: 1 },
        select: { updatedAt: true },
      }),
    ]);

  return {
    projects,
    workflows,
    pages,
    blogPosts,
    leadMagnets,
    settingsUpdatedAt: settings?.updatedAt,
  };
}
