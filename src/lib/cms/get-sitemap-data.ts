import { cacheLife, cacheTag } from "next/cache";
import { isDeprecatedCmsPage } from "@/lib/cms/deprecated-pages";
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
      where: { published: true },
      select: { slug: true, updatedAt: true, pageType: true },
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
    pages: pages.filter(
      (page) => !isDeprecatedCmsPage(page.slug, page.pageType),
    ),
    blogPosts,
  };
}
