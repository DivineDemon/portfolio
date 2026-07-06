import "server-only";

import { cacheLife, cacheTag } from "next/cache";
import {
  DEFAULT_FOOTER_CASE_STUDY,
  resolveBlogFooterCaseStudyLink,
} from "@/lib/blog/post-footer-links";
import {
  getPublishedProjects,
  getPublishedWorkflows,
} from "@/lib/data/case-studies";
import { prisma } from "@/lib/prisma";
import type { BlogCardPost, BlogPost } from "@/lib/types/blog";
import type { CaseStudyCard } from "@/lib/types/case-study";

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const publishedBlogCardSelect = {
  slug: true,
  title: true,
  excerpt: true,
  coverImage: true,
  publishedAt: true,
  updatedAt: true,
  featured: true,
} as const;

const publishedBlogPostSelect = {
  ...publishedBlogCardSelect,
  content: true,
  seoTitle: true,
  seoDescription: true,
  keywords: true,
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

const relatedBlogSelect = {
  ...publishedBlogCardSelect,
  keywords: true,
} as const;

function scoreKeywordOverlap(
  postKeywords: string[],
  currentKeywords: string[],
): number {
  if (currentKeywords.length === 0 || postKeywords.length === 0) {
    return 0;
  }

  const currentSet = new Set(
    currentKeywords.map((keyword) => keyword.toLowerCase()),
  );

  return postKeywords.filter((keyword) => currentSet.has(keyword.toLowerCase()))
    .length;
}

function compareRelatedPosts(
  a: BlogCardPost & { keywords: string[] },
  b: BlogCardPost & { keywords: string[] },
  currentKeywords: string[],
) {
  const scoreDiff =
    scoreKeywordOverlap(b.keywords, currentKeywords) -
    scoreKeywordOverlap(a.keywords, currentKeywords);

  if (scoreDiff !== 0) {
    return scoreDiff;
  }

  if (a.featured !== b.featured) {
    return a.featured ? -1 : 1;
  }

  const aTime = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
  const bTime = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;

  return bTime - aTime;
}

export async function getRelatedBlogPosts(
  currentSlug: string,
  currentKeywords: string[],
  limit = 2,
): Promise<BlogCardPost[]> {
  "use cache";
  cacheTag("blog");
  cacheLife("hours");

  const posts = await prisma.blog_posts.findMany({
    where: publishedBlogWhere(),
    select: relatedBlogSelect,
  });

  return posts
    .filter((post) => post.slug !== currentSlug)
    .sort((a, b) => compareRelatedPosts(a, b, currentKeywords))
    .slice(0, limit)
    .map(({ keywords: _keywords, ...post }) => post);
}

export async function getBlogFooterCaseStudy(
  blogSlug: string,
): Promise<CaseStudyCard | null> {
  const link = resolveBlogFooterCaseStudyLink(blogSlug);
  const items =
    link.kind === "project"
      ? await getPublishedProjects()
      : await getPublishedWorkflows();

  return (
    items.find((item) => item.slug === link.slug) ??
    items[0] ??
    (await getPublishedProjects()).find(
      (item) => item.slug === DEFAULT_FOOTER_CASE_STUDY.slug,
    ) ??
    null
  );
}
