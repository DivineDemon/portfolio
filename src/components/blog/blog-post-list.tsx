"use client";

import { BlogCard } from "@/components/blog/blog-card";
import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics/track";
import type { BlogCardPost } from "@/lib/types/blog";

type BlogPostListProps = {
  posts: BlogCardPost[];
  priorityFirst?: boolean;
};

export function BlogPostList({
  posts,
  priorityFirst = true,
}: BlogPostListProps) {
  return (
    <div className="divide-x divide-y grid sm:grid-cols-2">
      {posts.map((post, index) => (
        <BlogCard
          key={post.slug}
          post={post}
          priority={priorityFirst && index === 0 && Boolean(post.coverImage)}
          onClick={() => {
            trackEvent(ANALYTICS_EVENTS.BLOG_POST_CLICK, {
              item_slug: post.slug,
              item_title: post.title,
              source: "blog_index",
            });
          }}
        />
      ))}
    </div>
  );
}
