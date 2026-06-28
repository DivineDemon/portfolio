import { CaseStudyMarkdown } from "@/components/case-study/markdown";
import { BackLink, PageBreadcrumbs } from "@/components/cms/page-breadcrumbs";
import { RelatedWork } from "@/components/cms/related-work";
import MaxWidthWrapper from "@/components/ui/max-width-wrapper";
import type { pages } from "@/generated/prisma/client";

export function CmsMarkdownPage({ page }: { page: pages }) {
  const slugParts = page.slug.split("/");
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    ...slugParts.map((part, index) => {
      const path = slugParts.slice(0, index + 1).join("/");
      const isLast = index === slugParts.length - 1;
      return {
        label: isLast ? page.title : part.replace(/-/g, " "),
        href: isLast ? undefined : `/${path}`,
      };
    }),
  ];

  return (
    <article className="min-h-screen">
      <MaxWidthWrapper parentBorder="border-b">
        <div className="mx-auto max-w-3xl p-5">
          <PageBreadcrumbs items={breadcrumbItems} className="mb-4" />
          <h1 className="font-mono text-3xl font-bold tracking-tight md:text-4xl">
            {page.title}
          </h1>
          {page.excerpt && (
            <p className="mt-3 font-mono text-sm text-muted-foreground md:text-base">
              {page.excerpt}
            </p>
          )}
          {page.content?.trim() && (
            <div className="mt-5">
              <CaseStudyMarkdown content={page.content} />
            </div>
          )}
        </div>
      </MaxWidthWrapper>
      <MaxWidthWrapper parentBorder="border-b">
        <div className="mx-auto max-w-3xl">
          <RelatedWork
            projectSlugs={page.relatedProjectSlugs}
            workflowSlugs={page.relatedWorkflowSlugs}
            heading={
              page.pageType === "persona" ? "Proven track record" : undefined
            }
          />
        </div>
      </MaxWidthWrapper>
      <MaxWidthWrapper parentBorder="border-none">
        <div className="mx-auto max-w-3xl p-5">
          <BackLink href="/" label="Back to home" />
        </div>
      </MaxWidthWrapper>
    </article>
  );
}
