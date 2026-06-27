import { cacheLife, cacheTag } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function getClients() {
  "use cache";
  cacheTag("cms:clients");
  cacheLife("hours");

  return prisma.clients.findMany({
    orderBy: { id: "desc" },
  });
}
