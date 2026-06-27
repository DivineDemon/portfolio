import Image from "next/image";
import TrackedLink from "@/components/analytics/tracked-link";
import MaxWidthWrapper from "@/components/ui/max-width-wrapper";
import { ANALYTICS_EVENTS } from "@/lib/analytics/track";
import type { WorkflowListItem } from "@/lib/cms/get-published-workflows";
import { getPublishedWorkflows } from "@/lib/cms/get-published-workflows";
import { cn } from "@/lib/utils";

function WorkflowCard({
  workflow,
  isHero = false,
}: {
  workflow: WorkflowListItem;
  isHero?: boolean;
}) {
  const outcome = workflow.cardOutcome || workflow.headlineResult;

  return (
    <TrackedLink
      href={`/workflows/${workflow.slug}`}
      eventName={ANALYTICS_EVENTS.CASE_STUDY_CLICK}
      eventParams={{
        content_type: "workflow",
        item_slug: workflow.slug,
        item_title: workflow.title,
      }}
      className={cn(
        "group flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm",
        "transition-all duration-200 hover:border-border/80 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        isHero && "md:col-span-2",
      )}
    >
      <div className="relative aspect-16/10 w-full overflow-hidden bg-muted">
        <Image
          src={workflow.coverImage}
          alt={workflow.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          sizes={
            isHero
              ? "(max-width: 768px) 100vw, 66vw"
              : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          }
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        {workflow.integrations.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {workflow.integrations.slice(0, 3).map((integration) => (
              <span
                key={integration}
                className="rounded-md border border-primary/25 bg-primary/10 px-2 py-0.5 font-mono text-xs font-medium text-primary"
              >
                {integration}
              </span>
            ))}
            {workflow.integrations.length > 3 && (
              <span className="rounded-md border border-border bg-muted/50 px-2 py-0.5 font-mono text-xs text-muted-foreground">
                +{workflow.integrations.length - 3}
              </span>
            )}
          </div>
        )}
        <h3 className="font-mono text-lg font-semibold text-foreground transition-colors group-hover:text-foreground/90">
          {workflow.title}
        </h3>
        <p className="line-clamp-2 font-mono text-sm leading-relaxed text-muted-foreground">
          {outcome}
        </p>
      </div>
    </TrackedLink>
  );
}

const Workflows = async () => {
  const [featuredWorkflows, otherWorkflows] = await Promise.all([
    getPublishedWorkflows(true),
    getPublishedWorkflows(false),
  ]);

  if (featuredWorkflows.length === 0 && otherWorkflows.length === 0) {
    return null;
  }

  return (
    <section id="workflows" className="scroll-mt-20">
      <MaxWidthWrapper parentBorder="border-b">
        <h2 className="w-full border-b p-5 text-left font-mono text-2xl font-semibold tracking-tight">
          Workflows
        </h2>
        {featuredWorkflows.length > 0 && (
          <div className="relative grid w-full grid-cols-1 items-start justify-center gap-5 p-5 md:grid-cols-2">
            {featuredWorkflows.map((workflow, index) => (
              <WorkflowCard
                key={workflow.id}
                workflow={workflow}
                isHero={index === 0}
              />
            ))}
          </div>
        )}

        {otherWorkflows.length > 0 && (
          <>
            <h3 className="w-full border-t border-b p-5 text-left font-mono text-lg font-semibold tracking-tight text-muted-foreground">
              Other Workflows
            </h3>
            <div className="relative grid w-full grid-cols-1 items-start justify-center gap-5 p-5 md:grid-cols-2">
              {otherWorkflows.map((workflow) => (
                <WorkflowCard key={workflow.id} workflow={workflow} />
              ))}
            </div>
          </>
        )}
      </MaxWidthWrapper>
    </section>
  );
};

export default Workflows;
