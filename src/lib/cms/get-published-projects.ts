import { cacheLife, cacheTag } from "next/cache";
import type { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";

export async function getPublishedProjects(featured?: boolean) {
  "use cache";
  cacheTag("cms:projects");
  cacheLife("hours");

  const where: Prisma.projectsWhereInput = { published: true };
  if (featured !== undefined) {
    where.featured = featured;
  }

  return prisma.projects.findMany({
    where,
    include: { client: true },
    orderBy:
      featured === true
        ? [{ displayOrder: { sort: "asc", nulls: "last" } }]
        : [{ createdAt: "desc" }],
    take: featured === true ? 6 : undefined,
  });
}

export async function getProjectBySlug(slug: string) {
  "use cache";
  cacheTag("cms:projects", `cms:project:${slug}`);
  cacheLife("hours");

  return prisma.projects.findFirst({
    where: {
      slug,
      published: true,
    },
    include: {
      client: true,
    },
  });
}
