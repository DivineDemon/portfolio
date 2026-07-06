import "server-only";

import { cacheLife, cacheTag } from "next/cache";
import { prisma } from "@/lib/prisma";
import type { BlogCardPost, BlogPost } from "@/lib/types/blog";

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const publishedBlogCardSelect = {
  slug: true,
  title: true,
  excerpt: true,
  coverImage: true,
  publishedAt: true,
  updatedAt: true,
} as const;

const publishedBlogPostSelect = {
  ...publishedBlogCardSelect,
  content: true,
  seoTitle: true,
  seoDescription: true,
} as const;

function publishedBlogWhere() {
  return {
    published: true,
    OR: [{ publishedAt: null }, { publishedAt: { lte: new Date() } }],
  };
}

export async function getPublishedBlogPosts(): Promise<BlogCardPost[]> {
  "use cache";
  cacheTag("blog");
  cacheLife("hours");

  return prisma.blog_posts.findMany({
    where: publishedBlogWhere(),
    select: publishedBlogCardSelect,
    orderBy: [{ featured: "desc" }, { publishedAt: "desc" }],
  });
}

export async function getPublishedBlogSlugs(): Promise<string[]> {
  "use cache";
  cacheTag("blog");
  cacheLife("hours");

  const posts = await prisma.blog_posts.findMany({
    where: publishedBlogWhere(),
    select: { slug: true },
    orderBy: [{ publishedAt: "desc" }],
  });

  return posts.map((post) => post.slug);
}

export async function getPublishedBlogPostBySlug(
  slug: string,
): Promise<BlogPost | null> {
  if (!SLUG_PATTERN.test(slug)) {
    return null;
  }

  return getCachedPublishedBlogPostBySlug(slug);
}

async function getCachedPublishedBlogPostBySlug(
  slug: string,
): Promise<BlogPost | null> {
  "use cache";
  cacheTag("blog", `blog-${slug}`);
  cacheLife("hours");

  return prisma.blog_posts.findFirst({
    where: {
      slug,
      ...publishedBlogWhere(),
    },
    select: publishedBlogPostSelect,
  });
}
