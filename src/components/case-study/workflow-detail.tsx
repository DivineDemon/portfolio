import Image from "next/image";
import { CaseStudySection } from "@/components/case-study/case-study-section";
import { ClientTestimonial } from "@/components/case-study/client-testimonial";
import { MetricsSnapshot } from "@/components/case-study/metrics-snapshot";
import { TagList } from "@/components/case-study/tag-list";
import { WorkflowCanvas } from "@/components/workflow/workflow-canvas";
import { n8nToReactFlow } from "@/lib/n8n/to-react-flow";
import type { WorkflowCaseStudy } from "@/lib/types/case-study";

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

export function WorkflowCaseStudyDetail({
  workflow,
}: {
  workflow: WorkflowCaseStudy;
}) {
  const graph = n8nToReactFlow(workflow.workflowJson);

  const metaItems: Array<{ label: string; value: string }> = [
    workflow.cardOutcome
      ? { label: "Card outcome", value: workflow.cardOutcome }
      : null,
    workflow.seoTitle ? { label: "SEO title", value: workflow.seoTitle } : null,
    workflow.seoDescription
      ? { label: "SEO description", value: workflow.seoDescription }
      : null,
    workflow.displayOrder != null
      ? { label: "Display order", value: String(workflow.displayOrder) }
      : null,
    { label: "Featured", value: workflow.featured ? "Yes" : "No" },
    { label: "Created", value: formatDate(workflow.createdAt) },
    { label: "Updated", value: formatDate(workflow.updatedAt) },
  ].filter((item): item is { label: string; value: string } => item !== null);

  return (
    <article className="flex w-full max-w-3xl flex-col gap-8">
      <header className="flex flex-col gap-4">
        <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
          n8n Workflow
        </p>
        <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground">
          {workflow.title}
        </h1>
        <p className="text-base text-muted-foreground">
          {workflow.headlineResult}
        </p>
        <TagList items={workflow.integrations} title="Integrations" />
      </header>

      {workflow.coverImage ? (
        <div className="relative aspect-video w-full overflow-hidden">
          <Image
            alt={workflow.title}
            src={workflow.coverImage}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
          />
        </div>
      ) : null}

      {workflow.client ? <ClientTestimonial client={workflow.client} /> : null}

      <MetricsSnapshot metrics={workflow.metrics} />

      <section className="flex flex-col gap-3">
        <h2 className="font-heading text-xl font-semibold text-foreground">
          Workflow
        </h2>
        <WorkflowCanvas graph={graph} />
      </section>

      <dl className="grid grid-cols-1 gap-4 border border-border p-5 sm:grid-cols-2">
        {metaItems.map((item) => (
          <MetaItem key={item.label} label={item.label} value={item.value} />
        ))}
      </dl>

      <div className="flex flex-col gap-6">
        <CaseStudySection title="Problem" content={workflow.problem} />
        <CaseStudySection title="Approach" content={workflow.approach} />
        <CaseStudySection title="Results" content={workflow.results} />
      </div>

      <TagList items={workflow.keywords} title="Keywords" />

      <footer className="border-t border-border pt-4 font-mono text-xs text-muted-foreground">
        Slug: {workflow.slug}
      </footer>
    </article>
  );
}
