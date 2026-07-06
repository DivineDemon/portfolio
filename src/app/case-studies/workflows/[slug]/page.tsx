import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CaseStudyViewTracker from "@/components/analytics/case-study-view-tracker";
import { WorkflowCaseStudyDetail } from "@/components/case-study/workflow-detail";
import { JsonLd } from "@/components/seo/json-ld";
import {
  getPublishedWorkflowBySlug,
  getPublishedWorkflowSlugs,
} from "@/lib/data/case-studies";
import { buildArticleJsonLd, resolveImageUrl } from "@/lib/seo/article-json-ld";
import { absoluteUrl, buildPageMetadata } from "@/lib/seo/metadata";

type WorkflowPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getPublishedWorkflowSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: WorkflowPageProps): Promise<Metadata> {
  const { slug } = await params;
  const workflow = await getPublishedWorkflowBySlug(slug);

  if (!workflow) {
    return {};
  }

  return buildPageMetadata({
    title: workflow.seoTitle ?? workflow.title,
    description:
      workflow.seoDescription ?? workflow.headlineResult ?? undefined,
    path: `/case-studies/workflows/${slug}`,
    keywords: workflow.keywords.length ? workflow.keywords : undefined,
    openGraph: {
      images: [{ url: workflow.coverImage, alt: workflow.title }],
    },
    twitter: {
      images: [workflow.coverImage],
    },
  });
}

export default async function WorkflowCaseStudyPage({
  params,
}: WorkflowPageProps) {
  const { slug } = await params;
  const workflow = await getPublishedWorkflowBySlug(slug);

  if (!workflow) {
    notFound();
  }

  const title = workflow.seoTitle ?? workflow.title;
  const description = workflow.seoDescription ?? workflow.headlineResult;
  const canonical = absoluteUrl(`/case-studies/workflows/${slug}`);
  const articleJsonLd = buildArticleJsonLd({
    canonical,
    title,
    description,
    imageUrl: resolveImageUrl(workflow.coverImage),
    publishedAt: workflow.createdAt,
    updatedAt: workflow.updatedAt,
    keywords: workflow.keywords,
    breadcrumbs: [
      { name: "About", href: "/" },
      { name: "Case Studies", href: "/case-studies/workflows" },
      { name: "Workflows", href: "/case-studies/workflows" },
      { name: workflow.title, href: `/case-studies/workflows/${slug}` },
    ],
  });

  return (
    <>
      <JsonLd data={articleJsonLd} />
      <CaseStudyViewTracker
        contentType="workflow"
        slug={slug}
        title={workflow.title}
      />
      <WorkflowCaseStudyDetail workflow={workflow} />
    </>
  );
}
