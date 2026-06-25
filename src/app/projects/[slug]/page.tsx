import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CaseStudySection } from "@/components/case-study/case-study-section";
import { ClientTestimonial } from "@/components/case-study/client-testimonial";
import { DemoCta } from "@/components/case-study/demo-cta";
import { EngagementMeta } from "@/components/case-study/engagement-meta";
import { FullGallery, InlineGallery } from "@/components/case-study/gallery";
import { CaseStudyMarkdown } from "@/components/case-study/markdown";
import { MetricsSnapshot } from "@/components/case-study/metrics-snapshot";
import { RepositoryLink } from "@/components/case-study/repository-link";
import { TechnicalDetailsAccordion } from "@/components/case-study/technical-details-accordion";
import type { Project } from "@/components/case-study/types";
import DitherSplitter from "@/components/global/dither-splitter";
import MaxWidthWrapper from "@/components/ui/max-width-wrapper";
import { SITE_URL } from "@/lib/constants";
import { server } from "@/lib/elysia/server";
import {
  PERSON_SCHEMA_ID,
  safeJsonLdStringify,
  toAbsoluteUrl,
  WEBSITE_SCHEMA_ID,
} from "@/lib/json-ld";

export const revalidate = 300;

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

async function getProject(slug: string): Promise<Project | null> {
  const raw = await server.project({ slug }).get();
  return (
    raw && typeof raw === "object" && "data" in raw
      ? (raw as { data: Project | null }).data
      : raw
  ) as Project | null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return { title: "Project not found" };

  const title = project.seoTitle ?? project.title;
  const description = project.seoDescription ?? project.headlineResult;
  const canonical = `${SITE_URL}/projects/${slug}`;

  return {
    title,
    description,
    keywords: project.keywords?.length ? project.keywords : undefined,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "article",
      images: project.coverImage
        ? [
            {
              url: project.coverImage,
              alt: project.title,
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
      images: project.coverImage ? [project.coverImage] : undefined,
    },
    robots: { index: true, follow: true },
  };
}

export default async function ProjectCaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) notFound();

  const canonical = `${SITE_URL}/projects/${slug}`;
  const title = project.seoTitle ?? project.title;
  const description = project.seoDescription ?? project.headlineResult;
  const publishedAt = toIsoDate(project.createdAt);
  const updatedAt = toIsoDate(project.updatedAt);
  const imageUrl = toAbsoluteUrl(project.coverImage);
  const aboutItems = project.industry
    ? [{ "@type": "Thing", name: project.industry }]
    : [];
  const galleryImages = project.galleryImages ?? [];
  const galleryCaptions = project.galleryCaptions ?? [];

  const projectJsonLd = {
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
            name: "Projects",
            item: `${SITE_URL}/#projects`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: project.title,
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
        ...(project.keywords?.length
          ? { keywords: project.keywords.join(", ") }
          : {}),
        ...(aboutItems.length ? { about: aboutItems } : {}),
      },
    ],
  };

  return (
    <article className="min-h-screen">
      <script type="application/ld+json">
        {safeJsonLdStringify(projectJsonLd)}
      </script>
      <MaxWidthWrapper parentBorder="border-none">
        <header className="relative w-full">
          <Image
            priority
            width={1000}
            height={1000}
            alt={project.title}
            className="object-cover"
            src={project.coverImage}
          />
        </header>
      </MaxWidthWrapper>
      <MaxWidthWrapper parentBorder="border-y">
        <div className="mx-auto max-w-3xl border-0">
          {project.clientTestimonial?.trim() && (
            <ClientTestimonial content={project.clientTestimonial} />
          )}
          <div className="flex w-full flex-col items-center justify-center p-5">
            <h1 className="w-full text-left font-mono text-2xl font-bold tracking-tight text-foreground md:text-4xl">
              {project.title}
            </h1>
            <p className="mt-2 w-full text-left font-mono text-sm text-muted-foreground md:text-lg">
              {project.headlineResult}
            </p>
            {project.industry && (
              <p className="mt-3 w-full text-left font-mono text-xs text-muted-foreground md:text-sm">
                {project.industry}
              </p>
            )}
          </div>
          <MetricsSnapshot metrics={project.metrics} />
          <EngagementMeta project={project} />
          {project.demoUrl && <DemoCta demoUrl={project.demoUrl} />}
        </div>
      </MaxWidthWrapper>
      <DitherSplitter />
      <MaxWidthWrapper parentBorder="border-b" showPlusIcons={true}>
        <div className="mx-auto flex max-w-3xl items-center justify-start border-0 p-5">
          <Link
            href="/#projects"
            className="inline-flex items-center font-mono text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="mr-2.5 size-4" /> Back to projects
          </Link>
        </div>
      </MaxWidthWrapper>
      <MaxWidthWrapper parentBorder="border-none">
        <div className="mx-auto max-w-3xl border-0">
          <CaseStudySection title="Problem">
            <CaseStudyMarkdown content={project.problem} />
          </CaseStudySection>
          {project.situation?.trim() && (
            <CaseStudySection title="Situation">
              <CaseStudyMarkdown content={project.situation} />
            </CaseStudySection>
          )}
          {project.beforeAfter?.trim() && (
            <CaseStudySection title="Before & After">
              <CaseStudyMarkdown content={project.beforeAfter} />
            </CaseStudySection>
          )}
          <CaseStudySection title="Approach">
            <CaseStudyMarkdown content={project.approach} />
          </CaseStudySection>
          {project.whatMadeThisHard?.trim() && (
            <CaseStudySection title="What Made This Hard">
              <CaseStudyMarkdown content={project.whatMadeThisHard} />
            </CaseStudySection>
          )}
          {project.businessOutcome?.trim() && (
            <CaseStudySection title="Business Outcome">
              <CaseStudyMarkdown content={project.businessOutcome} />
            </CaseStudySection>
          )}
          <CaseStudySection title="Results">
            <CaseStudyMarkdown content={project.results} />
          </CaseStudySection>
          {galleryImages.length > 0 && (
            <InlineGallery
              images={galleryImages}
              captions={galleryCaptions}
              title={project.title}
            />
          )}
          <TechnicalDetailsAccordion project={project} />
          {galleryImages.length > 0 && (
            <FullGallery
              images={galleryImages}
              captions={galleryCaptions}
              title={project.title}
            />
          )}
          {project.repositoryUrl && (
            <RepositoryLink repositoryUrl={project.repositoryUrl} />
          )}
        </div>
      </MaxWidthWrapper>
      <DitherSplitter />
    </article>
  );
}
