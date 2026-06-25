import { ChevronDown } from "lucide-react";
import { CaseStudyMarkdown } from "@/components/case-study/markdown";
import { TagList } from "@/components/case-study/tag-list";
import type { Project } from "@/components/case-study/types";
import { cn } from "@/lib/utils";

function TechnicalSubsection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-3 border-t border-border pt-4 first:border-t-0 first:pt-0">
      <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {title}
      </h3>
      {children}
    </div>
  );
}

export function TechnicalDetailsAccordion({ project }: { project: Project }) {
  const hasMarkdown =
    project.whatWeBuilt?.trim() ||
    project.architecture?.trim() ||
    project.execution?.trim();
  const hasTags =
    (project.techStack?.length ?? 0) > 0 ||
    (project.infrastructure?.length ?? 0) > 0 ||
    (project.integrations?.length ?? 0) > 0;

  if (!hasMarkdown && !hasTags) return null;

  return (
    <section className="border-b p-5">
      <details className="group">
        <summary
          className={cn(
            "flex cursor-pointer list-none items-center justify-between gap-2",
            "font-mono text-sm font-semibold uppercase tracking-wider text-muted-foreground",
            "[&::-webkit-details-marker]:hidden",
          )}
        >
          Technical Details
          <ChevronDown className="size-4 shrink-0 transition-transform group-open:rotate-180" />
        </summary>
        <div className="mt-4 space-y-4">
          {project.whatWeBuilt?.trim() && (
            <TechnicalSubsection title="What We Built">
              <CaseStudyMarkdown content={project.whatWeBuilt} />
            </TechnicalSubsection>
          )}
          {project.architecture?.trim() && (
            <TechnicalSubsection title="Architecture">
              <CaseStudyMarkdown content={project.architecture} />
            </TechnicalSubsection>
          )}
          {project.execution?.trim() && (
            <TechnicalSubsection title="Execution">
              <CaseStudyMarkdown content={project.execution} />
            </TechnicalSubsection>
          )}
          {project.techStack?.length > 0 && (
            <TechnicalSubsection title="Tech Stack">
              <TagList items={project.techStack} />
            </TechnicalSubsection>
          )}
          {project.infrastructure?.length > 0 && (
            <TechnicalSubsection title="Infrastructure">
              <TagList items={project.infrastructure} />
            </TechnicalSubsection>
          )}
          {project.integrations?.length > 0 && (
            <TechnicalSubsection title="Integrations">
              <TagList items={project.integrations} />
            </TechnicalSubsection>
          )}
        </div>
      </details>
    </section>
  );
}
