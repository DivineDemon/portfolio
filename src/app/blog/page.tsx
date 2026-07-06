import type { Metadata } from "next";
import { BlogFeaturedHero } from "@/components/blog/blog-featured-hero";
import { BlogPostList } from "@/components/blog/blog-post-list";
import { getPublishedBlogPosts } from "@/lib/data/blog";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Blog — AI Systems, SaaS Architecture & Production Engineering",
  description:
    "Practical writing on RAG in production, AI automation, n8n workflows, and SaaS architecture — from a fractional CTO who ships measurable outcomes.",
  path: "/blog",
  keywords: [
    "fractional CTO",
    "AI automation",
    "RAG in production",
    "SaaS architecture",
    "n8n workflows",
  ],
});

export default async function BlogPage() {
  const posts = await getPublishedBlogPosts();
  const featuredPost = posts.find((post) => post.featured) ?? null;
  const listPosts = featuredPost
    ? posts.filter((post) => post.slug !== featuredPost.slug)
    : posts;

  return (
    <div className="w-full flex flex-col items-start justify-start gap-5 max-w-5xl">
      <div className="w-full flex flex-col items-center justify-center gap-2">
        <h1 className="w-full text-left font-heading text-3xl font-bold tracking-tight text-foreground">
          AI Systems &amp; Production Engineering
        </h1>
        <p className="w-full text-left text-sm text-muted-foreground">
          RAG pipelines, workflow automation, and SaaS architecture — practical
          notes for founders who need systems that ship, not slide decks.
        </p>
      </div>
      {posts.length === 0 ? (
        <p className="text-sm text-muted-foreground">No posts published yet.</p>
      ) : (
        <div className="flex w-full flex-col gap-8">
          {featuredPost ? <BlogFeaturedHero post={featuredPost} /> : null}
          {listPosts.length > 0 ? (
            <BlogPostList posts={listPosts} priorityFirst={!featuredPost} />
          ) : null}
        </div>
      )}
    </div>
  );
}
