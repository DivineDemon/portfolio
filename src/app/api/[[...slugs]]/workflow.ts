import Elysia, { t } from "elysia";
import type { Prisma } from "@/generated/prisma/client";
import { n8nToReactFlow } from "@/lib/n8n/to-react-flow";
import { prisma } from "@/lib/prisma";

function parseFeaturedFilter(value?: "true" | "false") {
  if (value === "true") return true;
  if (value === "false") return false;
  return undefined;
}

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

function mapWorkflowDetail(
  workflow: Prisma.n8n_workflowsGetPayload<{
    select: typeof workflowDetailSelect;
  }> | null,
) {
  if (!workflow) return null;

  const { clients, ...rest } = workflow;
  return {
    ...rest,
    client: clients,
  };
}

export const workflow = new Elysia({ prefix: "/workflow" })
  .get(
    "/",
    async ({ query }) => {
      const featured = parseFeaturedFilter(query.featured);
      const where: Prisma.n8n_workflowsWhereInput = {
        published: true,
      };

      if (featured !== undefined) {
        where.featured = featured;
      }

      return await prisma.n8n_workflows.findMany({
        where,
        select: workflowListSelect,
        orderBy:
          featured === true
            ? [{ displayOrder: { sort: "asc", nulls: "last" } }]
            : [{ createdAt: "desc" }],
        take: featured === true ? 6 : undefined,
      });
    },
    {
      query: t.Object({
        featured: t.Optional(t.Union([t.Literal("true"), t.Literal("false")])),
      }),
    },
  )
  .get(
    "/:slug/graph",
    async ({ params }) => {
      const record = await prisma.n8n_workflows.findFirst({
        where: {
          slug: params.slug,
          published: true,
        },
        select: {
          workflowJson: true,
        },
      });

      if (!record) return null;

      return n8nToReactFlow(record.workflowJson);
    },
    {
      params: t.Object({
        slug: t.String(),
      }),
    },
  )
  .get(
    "/:slug",
    async ({ params }) => {
      const record = await prisma.n8n_workflows.findFirst({
        where: {
          slug: params.slug,
          published: true,
        },
        select: workflowDetailSelect,
      });

      return mapWorkflowDetail(record);
    },
    {
      params: t.Object({
        slug: t.String(),
      }),
    },
  );
