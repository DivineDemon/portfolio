import type { Metadata } from "next";
import { BlogCard } from "@/components/blog/blog-card";
import { getPublishedBlogPosts } from "@/lib/data/blog";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Blog",
  description:
    "Thoughts on engineering, product, and building software that ships.",
  path: "/blog",
});

export default async function BlogPage() {
  const posts = await getPublishedBlogPosts();

  return (
    <div className="w-full flex flex-col items-start justify-start gap-5 max-w-5xl">
      <div className="w-full flex flex-col items-center justify-center gap-2">
        <h1 className="w-full text-left font-heading text-3xl font-bold tracking-tight text-foreground">
          Blog
        </h1>
        <p className="w-full text-left text-sm text-muted-foreground">
          Thoughts on engineering, product, and building software.
        </p>
      </div>
      {posts.length === 0 ? (
        <p className="text-sm text-muted-foreground">No posts published yet.</p>
      ) : (
        <div className="divide-x divide-y grid sm:grid-cols-2">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
