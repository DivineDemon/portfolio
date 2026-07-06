"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { BlogCard } from "@/components/blog/blog-card";
import { Button } from "@/components/ui/button";
import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics/track";
import type { BlogCardPost } from "@/lib/types/blog";
import type { CaseStudyCard } from "@/lib/types/case-study";
import { getCaseStudyHref } from "@/lib/types/case-study";

type BlogPostFooterProps = {
  postSlug: string;
  relatedPosts: BlogCardPost[];
  caseStudy: CaseStudyCard | null;
};

function FooterSection({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section className="flex flex-col gap-4 border-t border-border pt-8">
      <div className="flex flex-col gap-2">
        <h2 className="font-heading text-xl font-semibold text-foreground">
          {title}
        </h2>
        {description ? (
          <p className="text-sm text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {children}
    </section>
  );
}

export function BlogPostFooter({
  postSlug,
  relatedPosts,
  caseStudy,
}: BlogPostFooterProps) {
  const caseStudyHref = caseStudy
    ? getCaseStudyHref(caseStudy.kind, caseStudy.slug)
    : null;

  return (
    <footer className="mt-12 flex flex-col gap-8">
      {relatedPosts.length > 0 ? (
        <FooterSection
          title="Keep reading"
          description="More on production AI, automation, and shipping systems that hold up."
        >
          <div className="divide-x divide-y border border-border sm:grid sm:grid-cols-2">
            {relatedPosts.map((post) => (
              <BlogCard
                key={post.slug}
                post={post}
                onClick={() => {
                  trackEvent(ANALYTICS_EVENTS.BLOG_POST_CLICK, {
                    item_slug: post.slug,
                    item_title: post.title,
                    source: "blog_post_footer",
                  });
                }}
              />
            ))}
          </div>
        </FooterSection>
      ) : null}

      {caseStudy && caseStudyHref ? (
        <FooterSection
          title="See it in practice"
          description="Measurable outcomes from a similar engagement — not a tool list."
        >
          <div className="border border-border">
            <BlogCard
              post={caseStudy}
              href={caseStudyHref}
              onClick={() => {
                trackEvent(ANALYTICS_EVENTS.BLOG_CTA_CLICK, {
                  cta_type: "case_study",
                  source_post_slug: postSlug,
                  destination: caseStudyHref,
                  item_slug: caseStudy.slug,
                  item_title: caseStudy.title,
                });
              }}
            />
          </div>
        </FooterSection>
      ) : null}

      <FooterSection
        title="Working on something similar?"
        description="I partner with founders and product leaders on RAG systems, workflow automation, and fractional CTO advisory — when the problem is real and the outcome needs to be measurable."
      >
        <Button asChild>
          <Link
            href="/contact"
            onClick={() => {
              trackEvent(ANALYTICS_EVENTS.BLOG_CTA_CLICK, {
                cta_type: "contact",
                source_post_slug: postSlug,
                destination: "/contact",
              });
            }}
          >
            Get in touch
          </Link>
        </Button>
      </FooterSection>
    </footer>
  );
}
