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
import { getCmsBlogPosts } from "@/lib/data/cms-store";
import type { BlogCardPost, BlogPost } from "@/lib/types/blog";
import type { CaseStudyCard } from "@/lib/types/case-study";

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function toBlogCard(
  post: ReturnType<typeof getCmsBlogPosts>[number],
): BlogCardPost {
  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    coverImage: post.coverImage,
    publishedAt: post.publishedAt,
    updatedAt: post.updatedAt,
    featured: post.featured,
  };
}

function toBlogPost(
  post: ReturnType<typeof getCmsBlogPosts>[number],
): BlogPost {
  return {
    ...toBlogCard(post),
    content: post.content,
    seoTitle: post.seoTitle,
    seoDescription: post.seoDescription,
    keywords: post.keywords,
  };
}

function compareBlogCards(a: BlogCardPost, b: BlogCardPost) {
  if (Boolean(a.featured) !== Boolean(b.featured)) {
    return a.featured ? -1 : 1;
  }

  const aTime = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
  const bTime = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
  return bTime - aTime;
}

export async function getPublishedBlogPosts(): Promise<BlogCardPost[]> {
  "use cache";
  cacheTag("blog");
  cacheLife("max");

  return getCmsBlogPosts().map(toBlogCard).sort(compareBlogCards);
}

export async function getPublishedBlogSlugs(): Promise<string[]> {
  "use cache";
  cacheTag("blog");
  cacheLife("max");

  return getCmsBlogPosts()
    .map(toBlogCard)
    .sort(compareBlogCards)
    .map((post) => post.slug);
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
  cacheLife("max");

  const post = getCmsBlogPosts().find((entry) => entry.slug === slug);
  return post ? toBlogPost(post) : null;
}

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
  cacheLife("max");

  return getCmsBlogPosts()
    .filter((post) => post.slug !== currentSlug)
    .map((post) => ({ ...toBlogCard(post), keywords: post.keywords }))
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
