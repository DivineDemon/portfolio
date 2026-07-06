import "server-only";

import { cacheLife, cacheTag } from "next/cache";
import { prisma } from "@/lib/prisma";

function publishedBlogWhere() {
  return {
    published: true,
    OR: [{ publishedAt: null }, { publishedAt: { lte: new Date() } }],
  };
}

export async function getSitemapData() {
  "use cache";
  cacheTag("sitemap", "blog", "case-studies");
  cacheLife("hours");

  const [blogPosts, projects, workflows] = await Promise.all([
    prisma.blog_posts.findMany({
      where: publishedBlogWhere(),
      select: { slug: true, updatedAt: true },
      orderBy: [{ publishedAt: "desc" }],
    }),
    prisma.projects.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
    }),
    prisma.n8n_workflows.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
    }),
  ]);

  return { blogPosts, projects, workflows };
}
