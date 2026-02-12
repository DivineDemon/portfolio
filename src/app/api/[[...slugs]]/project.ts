import Elysia, { t } from "elysia";
import { prisma } from "@/lib/prisma";

export const project = new Elysia({ prefix: "/project" })
  .get("/", async () => {
    return await prisma.projects.findMany({
      where: {
        published: true,
      },
    });
  })
  .get(
    "/:slug",
    async ({ params }) => {
      return await prisma.projects.findUnique({
        where: {
          slug: params.slug,
        },
      });
    },
    {
      params: t.Object({
        slug: t.String(),
      }),
    },
  );
