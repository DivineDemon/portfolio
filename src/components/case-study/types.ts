import type {
  clients,
  n8n_workflows,
  projects,
} from "@/generated/prisma/client";

export type Project = projects & {
  client?: clients | null;
};

export type Workflow = Omit<n8n_workflows, "workflowJson"> & {
  client?: clients | null;
};

export type ProjectMetricValue = string | number | boolean | string[] | null;

export type ProjectMetrics = Record<string, ProjectMetricValue>;

export type EngagementType =
  | "client-work"
  | "founder-built"
  | "open-source"
  | "internal-tool";

export const ENGAGEMENT_TYPE_LABELS: Record<EngagementType, string> = {
  "client-work": "Client Work",
  "founder-built": "Founder Built",
  "open-source": "Open Source",
  "internal-tool": "Internal Tool",
};

export type { clients as Client };
