"use client";

import { BlogCard } from "@/components/blog/blog-card";
import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics/track";
import type { CaseStudyCard } from "@/lib/types/case-study";
import { getCaseStudyHref } from "@/lib/types/case-study";

type CaseStudyListProps = {
  title: string;
  description: string;
  items: CaseStudyCard[];
  emptyMessage: string;
};

export function CaseStudyList({
  title,
  description,
  items,
  emptyMessage,
}: CaseStudyListProps) {
  return (
    <div className="flex w-full max-w-5xl flex-col items-start justify-start gap-5">
      <div className="flex w-full flex-col items-center justify-center gap-2">
        <h1 className="w-full text-left font-heading text-3xl font-bold tracking-tight text-foreground">
          {title}
        </h1>
        <p className="w-full text-left text-sm text-muted-foreground">
          {description}
        </p>
      </div>
      {items.length === 0 ? (
        <p className="text-sm text-muted-foreground">{emptyMessage}</p>
      ) : (
        <div className="grid divide-x divide-y sm:grid-cols-2">
          {items.map((item) => (
            <BlogCard
              key={item.slug}
              post={item}
              href={getCaseStudyHref(item.kind, item.slug)}
              onClick={() => {
                trackEvent(ANALYTICS_EVENTS.CASE_STUDY_CLICK, {
                  content_type: item.kind,
                  item_slug: item.slug,
                  item_title: item.title,
                });
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
