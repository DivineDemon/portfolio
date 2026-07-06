import { ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CaseStudySection } from "@/components/case-study/case-study-section";
import { ClientTestimonial } from "@/components/case-study/client-testimonial";
import { CaseStudyGallery } from "@/components/case-study/gallery";
import { MetricsSnapshot } from "@/components/case-study/metrics-snapshot";
import { TagList } from "@/components/case-study/tag-list";
import type { ProjectCaseStudy } from "@/lib/types/case-study";
import { cn } from "@/lib/utils";

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <dt className="font-mono text-xs uppercase text-muted-foreground">
        {label}
      </dt>
      <dd className="text-sm text-foreground">{value}</dd>
    </div>
  );
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

export function ProjectCaseStudyDetail({
  project,
}: {
  project: ProjectCaseStudy;
}) {
  const metaItems: Array<{ label: string; value: string }> = [
    { label: "Role", value: project.role },
    project.industry ? { label: "Industry", value: project.industry } : null,
    project.engagementModel
      ? { label: "Engagement model", value: project.engagementModel }
      : null,
    project.engagementType
      ? { label: "Engagement type", value: project.engagementType }
      : null,
    project.teamSize != null
      ? {
          label: "Team size",
          value: String(project.teamSize),
        }
      : null,
    project.durationInMonths != null
      ? {
          label: "Duration",
          value: `${project.durationInMonths} month${project.durationInMonths !== 1 ? "s" : ""}`,
        }
      : null,
    project.cardOutcome
      ? { label: "Card outcome", value: project.cardOutcome }
      : null,
    project.seoTitle ? { label: "SEO title", value: project.seoTitle } : null,
    project.seoDescription
      ? { label: "SEO description", value: project.seoDescription }
      : null,
    project.displayOrder != null
      ? { label: "Display order", value: String(project.displayOrder) }
      : null,
    { label: "Featured", value: project.featured ? "Yes" : "No" },
    { label: "Live", value: project.isLive ? "Yes" : "No" },
    { label: "Created", value: formatDate(project.createdAt) },
    { label: "Updated", value: formatDate(project.updatedAt) },
  ].filter((item): item is { label: string; value: string } => item !== null);

  return (
    <article className="flex w-full max-w-3xl flex-col gap-8">
      <header className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
            Project
          </p>
          {project.industry ? (
            <span className="rounded-full bg-primary/15 px-3 py-1 text-xs font-medium text-primary">
              {project.industry}
            </span>
          ) : null}
          {project.isLive ? (
            <span className="rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
              Live
            </span>
          ) : null}
        </div>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground">
            {project.title}
          </h1>
          <div className="flex items-center gap-2">
            {project.demoUrl ? (
              <Link
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-primary underline-offset-4 hover:underline"
              >
                Demo
                <ExternalLink className="size-4" />
              </Link>
            ) : null}
            {project.repositoryUrl ? (
              <Link
                href={project.repositoryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-primary underline-offset-4 hover:underline"
              >
                Repository
                <ExternalLink className="size-4" />
              </Link>
            ) : null}
          </div>
        </div>
        <p className="text-base text-muted-foreground">
          {project.headlineResult}
        </p>
      </header>

      {project.coverImage ? (
        <div className="relative aspect-video w-full overflow-hidden">
          <Image
            alt={project.title}
            src={project.coverImage}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
          />
        </div>
      ) : null}

      {project.client ? <ClientTestimonial client={project.client} /> : null}

      <MetricsSnapshot metrics={project.metrics} />

      <dl className="grid grid-cols-1 gap-4 border border-border p-5 sm:grid-cols-2">
        {metaItems.map((item) => (
          <MetaItem key={item.label} label={item.label} value={item.value} />
        ))}
      </dl>

      <div className="flex flex-col gap-6">
        <CaseStudySection title="Problem" content={project.problem} />
        {project.situation ? (
          <CaseStudySection title="Situation" content={project.situation} />
        ) : null}
        {project.beforeAfter ? (
          <CaseStudySection
            title="Before & After"
            content={project.beforeAfter}
          />
        ) : null}
        <CaseStudySection title="Approach" content={project.approach} />
        {project.whatMadeThisHard ? (
          <CaseStudySection
            title="What Made This Hard"
            content={project.whatMadeThisHard}
          />
        ) : null}
        <CaseStudySection title="Architecture" content={project.architecture} />
        <CaseStudySection title="Execution" content={project.execution} />
        <CaseStudySection title="What We Built" content={project.whatWeBuilt} />
        <CaseStudySection title="Results" content={project.results} />
        {project.businessOutcome ? (
          <CaseStudySection
            title="Business Outcome"
            content={project.businessOutcome}
          />
        ) : null}
      </div>

      <div className="flex flex-col gap-4">
        <TagList items={project.techStack} title="Tech stack" />
        <TagList items={project.infrastructure} title="Infrastructure" />
        <TagList items={project.integrations} title="Integrations" />
        <TagList items={project.keywords} title="Keywords" />
      </div>

      <CaseStudyGallery
        images={project.galleryImages}
        captions={project.galleryCaptions}
        title={project.title}
      />

      <footer
        className={cn(
          "border-t border-border pt-4 font-mono text-xs text-muted-foreground",
        )}
      >
        Slug: {project.slug}
      </footer>
    </article>
  );
}
