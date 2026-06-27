import Image from "next/image";
import TrackedLink from "@/components/analytics/tracked-link";
import { CaseStudyMarkdown } from "@/components/case-study/markdown";
import { BackLink, PageBreadcrumbs } from "@/components/cms/page-breadcrumbs";
import { RelatedWork } from "@/components/cms/related-work";
import DitherSplitter from "@/components/global/dither-splitter";
import MaxWidthWrapper from "@/components/ui/max-width-wrapper";
import type { pages } from "@/generated/prisma/client";
import { ANALYTICS_EVENTS } from "@/lib/analytics/track";
import { getPublishedProjects } from "@/lib/cms/get-published-projects";
import { getPublishedWorkflows } from "@/lib/cms/get-published-workflows";
import { HOMEPAGE_DEFAULTS } from "@/lib/seo/defaults";

function _slugToPath(slug: string) {
  return `/${slug}`;
}

export async function WorkIndexPage({ page }: { page: pages }) {
  const [projects, workflows] = await Promise.all([
    getPublishedProjects(),
    getPublishedWorkflows(),
  ]);

  return (
    <article className="min-h-screen">
      <MaxWidthWrapper parentBorder="border-b">
        <div className="mx-auto max-w-3xl p-5">
          <PageBreadcrumbs
            items={[{ label: "Home", href: "/" }, { label: page.title }]}
            className="mb-4"
          />
          <h1 className="font-mono text-3xl font-bold tracking-tight md:text-4xl">
            {page.title}
          </h1>
          {page.excerpt && (
            <p className="mt-3 font-mono text-sm text-muted-foreground md:text-base">
              {page.excerpt}
            </p>
          )}
          {page.content?.trim() && (
            <div className="mt-6">
              <CaseStudyMarkdown content={page.content} />
            </div>
          )}
        </div>
      </MaxWidthWrapper>
      <DitherSplitter />
      <MaxWidthWrapper parentBorder="border-b">
        <div className="mx-auto max-w-3xl p-5">
          <h2 className="mb-4 font-mono text-xl font-semibold">
            {HOMEPAGE_DEFAULTS.caseStudiesLabel}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {projects.map((project) => {
              const outcome = project.cardOutcome || project.headlineResult;
              return (
                <TrackedLink
                  key={project.slug}
                  href={`/projects/${project.slug}`}
                  eventName={ANALYTICS_EVENTS.CASE_STUDY_CLICK}
                  eventParams={{
                    content_type: "project",
                    item_slug: project.slug,
                    item_title: project.title,
                  }}
                  className="group overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="relative aspect-16/10 bg-muted">
                    <Image
                      src={project.coverImage}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-[1.02]"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-mono text-base font-semibold">
                      {project.title}
                    </h3>
                    <p className="mt-1 line-clamp-2 font-mono text-sm text-muted-foreground">
                      {outcome}
                    </p>
                  </div>
                </TrackedLink>
              );
            })}
          </div>
        </div>
      </MaxWidthWrapper>
      {workflows.length > 0 && (
        <>
          <DitherSplitter />
          <MaxWidthWrapper parentBorder="border-b">
            <div className="mx-auto max-w-3xl p-5">
              <h2 className="mb-4 font-mono text-xl font-semibold">
                Workflows
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {workflows.map((workflow) => {
                  const outcome =
                    workflow.cardOutcome || workflow.headlineResult;
                  return (
                    <TrackedLink
                      key={workflow.slug}
                      href={`/workflows/${workflow.slug}`}
                      eventName={ANALYTICS_EVENTS.CASE_STUDY_CLICK}
                      eventParams={{
                        content_type: "workflow",
                        item_slug: workflow.slug,
                        item_title: workflow.title,
                      }}
                      className="group overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md"
                    >
                      <div className="relative aspect-16/10 bg-muted">
                        <Image
                          src={workflow.coverImage}
                          alt={workflow.title}
                          fill
                          className="object-cover transition-transform group-hover:scale-[1.02]"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-mono text-base font-semibold">
                          {workflow.title}
                        </h3>
                        <p className="mt-1 line-clamp-2 font-mono text-sm text-muted-foreground">
                          {outcome}
                        </p>
                      </div>
                    </TrackedLink>
                  );
                })}
              </div>
            </div>
          </MaxWidthWrapper>
        </>
      )}
      <MaxWidthWrapper parentBorder="border-none">
        <div className="mx-auto max-w-3xl p-5">
          <BackLink href="/" label="Back to home" />
        </div>
      </MaxWidthWrapper>
    </article>
  );
}

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
