import { cacheLife, cacheTag } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function getPublishedPages() {
  "use cache";
  cacheTag("cms:pages");
  cacheLife("hours");

  return prisma.pages.findMany({
    where: { published: true },
    orderBy: [
      { sortOrder: { sort: "asc", nulls: "last" } },
      { updatedAt: "desc" },
    ],
  });
}

export async function getPublishedPageBySlug(slug: string) {
  "use cache";
  cacheTag("cms:pages", `cms:page:${slug}`);
  cacheLife("hours");

  return prisma.pages.findFirst({
    where: {
      slug,
      published: true,
    },
  });
}
