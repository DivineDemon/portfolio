import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import CaseStudyViewTracker from "@/components/analytics/case-study-view-tracker";
import { CaseStudySection } from "@/components/case-study/case-study-section";
import { ClientTestimonial } from "@/components/case-study/client-testimonial";
import { CaseStudyMarkdown } from "@/components/case-study/markdown";
import { MetricsSnapshot } from "@/components/case-study/metrics-snapshot";
import { TagList } from "@/components/case-study/tag-list";
import type { Workflow } from "@/components/case-study/types";
import DitherSplitter from "@/components/global/dither-splitter";
import MaxWidthWrapper from "@/components/ui/max-width-wrapper";
import { WorkflowCanvas } from "@/components/workflow/workflow-canvas";
import { getWorkflowBySlug } from "@/lib/cms/get-published-workflows";
import { SITE_URL } from "@/lib/constants";
import {
  PERSON_SCHEMA_ID,
  safeJsonLdStringify,
  toAbsoluteUrl,
  WEBSITE_SCHEMA_ID,
} from "@/lib/json-ld";

function toIsoDate(value: unknown): string | undefined {
  if (value instanceof Date) {
    return value.toISOString();
  }

  if (typeof value === "string") {
    const parsed = new Date(value);
    if (!Number.isNaN(parsed.getTime())) {
      return parsed.toISOString();
    }
  }

  return undefined;
}

async function getWorkflow(slug: string): Promise<Workflow | null> {
  return getWorkflowBySlug(slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const workflow = await getWorkflow(slug);
  if (!workflow) return { title: "Workflow not found" };

  const title = workflow.seoTitle ?? workflow.title;
  const description = workflow.seoDescription ?? workflow.headlineResult;
  const canonical = `${SITE_URL}/workflows/${slug}`;

  return {
    title,
    description,
    keywords: workflow.keywords?.length ? workflow.keywords : undefined,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "article",
      images: workflow.coverImage
        ? [
            {
              url: workflow.coverImage,
              alt: workflow.title,
              width: 1200,
              height: 630,
            },
          ]
        : undefined,
      siteName: "Mushood Hanif",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: workflow.coverImage ? [workflow.coverImage] : undefined,
    },
    robots: { index: true, follow: true },
  };
}

export default async function WorkflowCaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const workflow = await getWorkflow(slug);

  if (!workflow) notFound();

  const canonical = `${SITE_URL}/workflows/${slug}`;
  const title = workflow.seoTitle ?? workflow.title;
  const description = workflow.seoDescription ?? workflow.headlineResult;
  const publishedAt = toIsoDate(workflow.createdAt);
  const updatedAt = toIsoDate(workflow.updatedAt);
  const imageUrl = toAbsoluteUrl(workflow.coverImage);
  const aboutItems = workflow.integrations?.length
    ? workflow.integrations.map((name) => ({ "@type": "Thing", name }))
    : [];

  const workflowJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": `${canonical}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: SITE_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Workflows",
            item: `${SITE_URL}/#workflows`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: workflow.title,
            item: canonical,
          },
        ],
      },
      {
        "@type": "Article",
        "@id": `${canonical}#article`,
        headline: title,
        description,
        url: canonical,
        mainEntityOfPage: canonical,
        isPartOf: {
          "@id": WEBSITE_SCHEMA_ID,
        },
        image: [imageUrl],
        author: { "@id": PERSON_SCHEMA_ID },
        publisher: { "@id": PERSON_SCHEMA_ID },
        ...(publishedAt ? { datePublished: publishedAt } : {}),
        ...(updatedAt ? { dateModified: updatedAt } : {}),
        ...(workflow.keywords?.length
          ? { keywords: workflow.keywords.join(", ") }
          : {}),
        ...(aboutItems.length ? { about: aboutItems } : {}),
      },
    ],
  };

  return (
    <article className="min-h-screen">
      <script type="application/ld+json">
        {safeJsonLdStringify(workflowJsonLd)}
      </script>
      <CaseStudyViewTracker
        contentType="workflow"
        slug={slug}
        title={workflow.title}
      />
      <MaxWidthWrapper parentBorder="border-none">
        <header className="relative w-full">
          <Image
            priority
            width={1000}
            height={1000}
            alt={workflow.title}
            className="object-cover"
            src={workflow.coverImage}
          />
        </header>
      </MaxWidthWrapper>
      <MaxWidthWrapper parentBorder="border-t">
        <div className="mx-auto max-w-3xl border-0">
          {workflow.client?.content?.trim() && (
            <ClientTestimonial client={workflow.client} />
          )}
          <div className="flex w-full flex-col items-center justify-center p-5">
            <h1 className="w-full text-left font-mono text-2xl font-bold tracking-tight text-foreground md:text-4xl">
              {workflow.title}
            </h1>
            <p className="mt-2 w-full text-left font-mono text-sm text-muted-foreground md:text-lg">
              {workflow.headlineResult}
            </p>
            {workflow.integrations?.length > 0 && (
              <div className="mt-4 w-full">
                <TagList items={workflow.integrations} />
              </div>
            )}
          </div>
          <MetricsSnapshot metrics={workflow.metrics} />
        </div>
      </MaxWidthWrapper>
      <MaxWidthWrapper parentBorder="border-b" showPlusIcons={true}>
        <div className="mx-auto flex max-w-3xl items-center justify-start border-0 p-5">
          <Link
            href="/#workflows"
            className="inline-flex items-center font-mono text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="mr-2.5 size-4" /> Back to workflows
          </Link>
        </div>
      </MaxWidthWrapper>
      <MaxWidthWrapper parentBorder="border-b">
        <div className="p-5">
          <WorkflowCanvas slug={slug} />
        </div>
      </MaxWidthWrapper>
      <DitherSplitter />
      <MaxWidthWrapper parentBorder="border-none">
        <div className="mx-auto max-w-3xl border-0">
          {workflow.problem?.trim() && (
            <CaseStudySection title="Problem">
              <CaseStudyMarkdown content={workflow.problem} />
            </CaseStudySection>
          )}
          {workflow.approach?.trim() && (
            <CaseStudySection title="Approach">
              <CaseStudyMarkdown content={workflow.approach} />
            </CaseStudySection>
          )}
          {workflow.results?.trim() && (
            <CaseStudySection title="Results">
              <CaseStudyMarkdown content={workflow.results} />
            </CaseStudySection>
          )}
        </div>
      </MaxWidthWrapper>
      <DitherSplitter />
    </article>
  );
}
