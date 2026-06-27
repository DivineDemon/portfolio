import { cacheLife, cacheTag } from "next/cache";
import type { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";

export async function getPublishedPagesByType(pageType: string) {
  "use cache";
  cacheTag("cms:pages");
  cacheLife("hours");

  return prisma.pages.findMany({
    where: { published: true, pageType },
    orderBy: [
      { sortOrder: { sort: "asc", nulls: "last" } },
      { updatedAt: "desc" },
    ],
  });
}

export async function getPublishedPagesForFooter() {
  "use cache";
  cacheTag("cms:pages");
  cacheLife("hours");

  return prisma.pages.findMany({
    where: { published: true },
    orderBy: [{ sortOrder: { sort: "asc", nulls: "last" } }, { title: "asc" }],
    select: {
      slug: true,
      title: true,
      pageType: true,
    },
  });
}

export async function getRelatedWork(
  projectSlugs: string[],
  workflowSlugs: string[],
) {
  "use cache";
  cacheTag("cms:projects", "cms:workflows");
  cacheLife("hours");

  const [projects, workflows] = await Promise.all([
    projectSlugs.length
      ? prisma.projects.findMany({
          where: { slug: { in: projectSlugs }, published: true },
          select: {
            slug: true,
            title: true,
            coverImage: true,
            cardOutcome: true,
            headlineResult: true,
            industry: true,
          },
        })
      : Promise.resolve([]),
    workflowSlugs.length
      ? prisma.n8n_workflows.findMany({
          where: { slug: { in: workflowSlugs }, published: true },
          select: {
            slug: true,
            title: true,
            coverImage: true,
            cardOutcome: true,
            headlineResult: true,
          },
        })
      : Promise.resolve([]),
  ]);

  const projectOrder = new Map(
    projectSlugs.map((slug, index) => [slug, index]),
  );
  const workflowOrder = new Map(
    workflowSlugs.map((slug, index) => [slug, index]),
  );

  return {
    projects: [...projects].sort(
      (a, b) =>
        (projectOrder.get(a.slug) ?? 999) - (projectOrder.get(b.slug) ?? 999),
    ),
    workflows: [...workflows].sort(
      (a, b) =>
        (workflowOrder.get(a.slug) ?? 999) - (workflowOrder.get(b.slug) ?? 999),
    ),
  };
}

export async function getProjectsBySlugs(slugs: string[]) {
  "use cache";
  cacheTag("cms:projects");
  cacheLife("hours");

  if (slugs.length === 0) return [];

  return prisma.projects.findMany({
    where: { slug: { in: slugs }, published: true },
    include: { client: true },
  });
}

export type PublishedPage = Prisma.pagesGetPayload<object>;
