import Elysia, { t } from "elysia";
import type { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";

function parseFeaturedFilter(value?: "true" | "false") {
  if (value === "true") return true;
  if (value === "false") return false;
  return undefined;
}

export const project = new Elysia({ prefix: "/project" })
  .get(
    "/",
    async ({ query }) => {
      const featured = parseFeaturedFilter(query.featured);
      const where: Prisma.projectsWhereInput = {
        published: true,
      };

      if (featured !== undefined) {
        where.featured = featured;
      }

      return await prisma.projects.findMany({
        where,
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
    "/:slug",
    async ({ params }) => {
      return await prisma.projects.findFirst({
        where: {
          slug: params.slug,
          published: true,
        },
      });
    },
    {
      params: t.Object({
        slug: t.String(),
      }),
    },
  );
