import { cacheLife, cacheTag } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function getPublishedServicePages() {
  "use cache";
  cacheTag("cms:pages");
  cacheLife("hours");

  return prisma.pages.findMany({
    where: {
      published: true,
      pageType: "service",
    },
    orderBy: [
      { sortOrder: { sort: "asc", nulls: "last" } },
      { updatedAt: "desc" },
    ],
  });
}
