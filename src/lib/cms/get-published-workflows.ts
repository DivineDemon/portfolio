import { cacheLife, cacheTag } from "next/cache";
import type { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";

const workflowListSelect = {
  id: true,
  slug: true,
  title: true,
  headlineResult: true,
  problem: true,
  approach: true,
  results: true,
  integrations: true,
  metrics: true,
  coverImage: true,
  cardOutcome: true,
  displayOrder: true,
  featured: true,
  published: true,
  seoTitle: true,
  seoDescription: true,
  keywords: true,
  createdAt: true,
  updatedAt: true,
  clientId: true,
} satisfies Prisma.n8n_workflowsSelect;

const workflowDetailSelect = {
  ...workflowListSelect,
  clients: true,
} satisfies Prisma.n8n_workflowsSelect;

export type WorkflowListItem = Prisma.n8n_workflowsGetPayload<{
  select: typeof workflowListSelect;
}>;

export type WorkflowDetail = Omit<
  Prisma.n8n_workflowsGetPayload<{ select: typeof workflowDetailSelect }>,
  "clients"
> & {
  client: Prisma.n8n_workflowsGetPayload<{
    select: typeof workflowDetailSelect;
  }>["clients"];
};

function mapWorkflowDetail(
  workflow: Prisma.n8n_workflowsGetPayload<{
    select: typeof workflowDetailSelect;
  }> | null,
): WorkflowDetail | null {
  if (!workflow) return null;

  const { clients, ...rest } = workflow;
  return {
    ...rest,
    client: clients,
  };
}

export async function getPublishedWorkflows(featured?: boolean) {
  "use cache";
  cacheTag("cms:workflows");
  cacheLife("hours");

  const where: Prisma.n8n_workflowsWhereInput = { published: true };
  if (featured !== undefined) {
    where.featured = featured;
  }

  return prisma.n8n_workflows.findMany({
    where,
    select: workflowListSelect,
    orderBy:
      featured === true
        ? [{ displayOrder: { sort: "asc", nulls: "last" } }]
        : [{ createdAt: "desc" }],
    take: featured === true ? 6 : undefined,
  });
}

export async function getWorkflowBySlug(slug: string) {
  "use cache";
  cacheTag("cms:workflows", `cms:workflow:${slug}`);
  cacheLife("hours");

  const record = await prisma.n8n_workflows.findFirst({
    where: {
      slug,
      published: true,
    },
    select: workflowDetailSelect,
  });

  return mapWorkflowDetail(record);
}

export async function getWorkflowGraph(slug: string) {
  "use cache";
  cacheTag("cms:workflows", `cms:workflow:${slug}`);
  cacheLife("hours");

  return prisma.n8n_workflows.findFirst({
    where: {
      slug,
      published: true,
    },
    select: {
      workflowJson: true,
    },
  });
}
