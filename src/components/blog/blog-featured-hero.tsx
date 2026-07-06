"use client";

import Image from "next/image";
import Link from "next/link";
import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics/track";
import type { BlogCardPost } from "@/lib/types/blog";

type BlogFeaturedHeroProps = {
  post: BlogCardPost;
};

function formatPublishedDate(date: Date | string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

export function BlogFeaturedHero({ post }: BlogFeaturedHeroProps) {
  const { slug, title, excerpt, coverImage, publishedAt } = post;

  return (
    <Link
      href={`/blog/${slug}`}
      onClick={() => {
        trackEvent(ANALYTICS_EVENTS.BLOG_POST_CLICK, {
          item_slug: slug,
          item_title: title,
          source: "blog_index_hero",
        });
      }}
      className="group flex w-full flex-col overflow-hidden border border-border bg-card text-card-foreground transition-colors hover:bg-accent/30 md:flex-row"
    >
      {coverImage ? (
        <div className="relative aspect-video w-full shrink-0 overflow-hidden md:aspect-auto md:min-h-72 md:w-1/2">
          <Image
            alt={title}
            src={coverImage}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      ) : null}
      <div className="flex flex-1 flex-col gap-4 p-6 md:p-8">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Featured
        </p>
        <h2 className="font-heading text-2xl font-bold tracking-tight text-card-foreground underline-offset-4 group-hover:underline md:text-3xl">
          {title}
        </h2>
        {excerpt ? (
          <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
            {excerpt}
          </p>
        ) : null}
        {publishedAt ? (
          <time
            dateTime={new Date(publishedAt).toISOString()}
            className="mt-auto block text-sm font-medium text-muted-foreground"
          >
            {formatPublishedDate(publishedAt)}
          </time>
        ) : null}
      </div>
    </Link>
  );
}
