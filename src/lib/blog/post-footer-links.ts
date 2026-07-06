import type { CaseStudyKind } from "@/lib/types/case-study";

export type BlogFooterCaseStudyLink = {
  kind: CaseStudyKind;
  slug: string;
};

/** Per-post case study recommendations from the content audit. */
export const BLOG_POST_CASE_STUDY_LINKS: Record<
  string,
  BlogFooterCaseStudyLink
> = {
  "stop-prompting-ai-start-building-loops": {
    kind: "project",
    slug: "scintia",
  },
};

export const DEFAULT_FOOTER_CASE_STUDY: BlogFooterCaseStudyLink = {
  kind: "project",
  slug: "scintia",
};

export function resolveBlogFooterCaseStudyLink(
  blogSlug: string,
): BlogFooterCaseStudyLink {
  return BLOG_POST_CASE_STUDY_LINKS[blogSlug] ?? DEFAULT_FOOTER_CASE_STUDY;
}
