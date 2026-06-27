import { cacheLife, cacheTag } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function getPublishedBlogPosts() {
  "use cache";
  cacheTag("cms:blog");
  cacheLife("hours");

  return prisma.blog_posts.findMany({
    where: { published: true },
    orderBy: [
      { publishedAt: { sort: "desc", nulls: "last" } },
      { updatedAt: "desc" },
    ],
  });
}

export async function getPublishedBlogPostBySlug(slug: string) {
  "use cache";
  cacheTag("cms:blog", `cms:blog:${slug}`);
  cacheLife("hours");

  return prisma.blog_posts.findFirst({
    where: {
      slug,
      published: true,
    },
  });
}

export async function getFeaturedBlogPosts(limit = 3) {
  "use cache";
  cacheTag("cms:blog");
  cacheLife("hours");

  return prisma.blog_posts.findMany({
    where: { published: true, featured: true },
    orderBy: [{ publishedAt: { sort: "desc", nulls: "last" } }],
    take: limit,
  });
}
