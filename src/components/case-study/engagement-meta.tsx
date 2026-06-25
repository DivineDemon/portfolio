import {
  ENGAGEMENT_TYPE_LABELS,
  type EngagementType,
  type Project,
} from "@/components/case-study/types";
import { cn } from "@/lib/utils";

function Badge({
  children,
  variant = "default",
}: {
  children: React.ReactNode;
  variant?: "default" | "live";
}) {
  return (
    <span
      className={cn(
        "rounded-md border px-2 py-0.5 font-mono text-xs",
        variant === "live"
          ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
          : "border-border bg-muted/50 text-muted-foreground",
      )}
    >
      {children}
    </span>
  );
}

export function EngagementMeta({ project }: { project: Project }) {
  const metaItems: string[] = [];

  if (project.role) metaItems.push(project.role);
  if (project.durationInMonths != null) {
    metaItems.push(
      `${project.durationInMonths} month${project.durationInMonths !== 1 ? "s" : ""}`,
    );
  }
  if (project.teamSize != null) {
    metaItems.push(`Team of ${project.teamSize}`);
  }
  if (project.engagementModel?.trim()) {
    metaItems.push(project.engagementModel.trim());
  }

  const engagementLabel =
    project.engagementType &&
    ENGAGEMENT_TYPE_LABELS[project.engagementType as EngagementType];

  if (!metaItems.length && !engagementLabel && !project.isLive) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center gap-2 border-b px-5 py-3">
      {metaItems.length > 0 && (
        <p className="font-mono text-xs text-muted-foreground md:text-sm">
          {metaItems.join(" · ")}
        </p>
      )}
      <div className="flex flex-wrap items-center gap-2">
        {engagementLabel && <Badge>{engagementLabel}</Badge>}
        {project.isLive && <Badge variant="live">Live</Badge>}
      </div>
    </div>
  );
}
