import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CaseStudyViewTracker from "@/components/analytics/case-study-view-tracker";
import { ProjectCaseStudyDetail } from "@/components/case-study/project-detail";
import { JsonLd } from "@/components/seo/json-ld";
import {
  getPublishedProjectBySlug,
  getPublishedProjectSlugs,
} from "@/lib/data/case-studies";
import { buildArticleJsonLd, resolveImageUrl } from "@/lib/seo/article-json-ld";
import { absoluteUrl, buildPageMetadata } from "@/lib/seo/metadata";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getPublishedProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getPublishedProjectBySlug(slug);

  if (!project) {
    return {};
  }

  return buildPageMetadata({
    title: project.seoTitle ?? project.title,
    description: project.seoDescription ?? project.headlineResult ?? undefined,
    path: `/case-studies/projects/${slug}`,
    keywords: project.keywords.length ? project.keywords : undefined,
    openGraph: {
      images: [{ url: project.coverImage, alt: project.title }],
    },
    twitter: {
      images: [project.coverImage],
    },
  });
}

export default async function ProjectCaseStudyPage({
  params,
}: ProjectPageProps) {
  const { slug } = await params;
  const project = await getPublishedProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const title = project.seoTitle ?? project.title;
  const description = project.seoDescription ?? project.headlineResult;
  const canonical = absoluteUrl(`/case-studies/projects/${slug}`);
  const articleJsonLd = buildArticleJsonLd({
    canonical,
    title,
    description,
    imageUrl: resolveImageUrl(project.coverImage),
    publishedAt: project.createdAt,
    updatedAt: project.updatedAt,
    keywords: project.keywords,
    breadcrumbs: [
      { name: "About", href: "/" },
      { name: "Case Studies", href: "/case-studies/projects" },
      { name: "Projects", href: "/case-studies/projects" },
      { name: project.title, href: `/case-studies/projects/${slug}` },
    ],
  });

  return (
    <>
      <JsonLd data={articleJsonLd} />
      <CaseStudyViewTracker
        contentType="project"
        slug={slug}
        title={project.title}
      />
      <ProjectCaseStudyDetail project={project} />
    </>
  );
}
