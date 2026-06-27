import { cacheLife, cacheTag } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function getPublishedLeadMagnets() {
  "use cache";
  cacheTag("cms:lead_magnets");
  cacheLife("hours");

  return prisma.lead_magnets.findMany({
    where: { published: true },
    orderBy: { updatedAt: "desc" },
  });
}

export async function getPublishedLeadMagnetBySlug(slug: string) {
  "use cache";
  cacheTag("cms:lead_magnets", `cms:lead_magnet:${slug}`);
  cacheLife("hours");

  return prisma.lead_magnets.findFirst({
    where: {
      slug,
      published: true,
    },
  });
}
