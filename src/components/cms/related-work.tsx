import Image from "next/image";
import TrackedLink from "@/components/analytics/tracked-link";
import { ANALYTICS_EVENTS } from "@/lib/analytics/track";
import { getRelatedWork } from "@/lib/cms/page-helpers";

export async function RelatedWork({
  projectSlugs,
  workflowSlugs,
}: {
  projectSlugs: string[];
  workflowSlugs: string[];
}) {
  const { projects, workflows } = await getRelatedWork(
    projectSlugs,
    workflowSlugs,
  );

  if (projects.length === 0 && workflows.length === 0) {
    return null;
  }

  return (
    <section className="border-t p-5">
      <h2 className="mb-4 font-mono text-lg font-semibold tracking-tight">
        Related work
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
              className="group flex overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="relative h-24 w-28 shrink-0 bg-muted">
                <Image
                  src={project.coverImage}
                  alt={project.title}
                  fill
                  className="object-cover"
                  sizes="112px"
                />
              </div>
              <div className="flex min-w-0 flex-1 flex-col justify-center p-3">
                {project.industry && (
                  <span className="mb-1 font-mono text-xs text-primary">
                    {project.industry}
                  </span>
                )}
                <p className="truncate font-mono text-sm font-medium">
                  {project.title}
                </p>
                <p className="line-clamp-2 font-mono text-xs text-muted-foreground">
                  {outcome}
                </p>
              </div>
            </TrackedLink>
          );
        })}
        {workflows.map((workflow) => {
          const outcome = workflow.cardOutcome || workflow.headlineResult;

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
              className="group flex overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="relative h-24 w-28 shrink-0 bg-muted">
                <Image
                  src={workflow.coverImage}
                  alt={workflow.title}
                  fill
                  className="object-cover"
                  sizes="112px"
                />
              </div>
              <div className="flex min-w-0 flex-1 flex-col justify-center p-3">
                <span className="mb-1 font-mono text-xs text-primary">
                  Workflow
                </span>
                <p className="truncate font-mono text-sm font-medium">
                  {workflow.title}
                </p>
                <p className="line-clamp-2 font-mono text-xs text-muted-foreground">
                  {outcome}
                </p>
              </div>
            </TrackedLink>
          );
        })}
      </div>
    </section>
  );
}
