import Elysia from "elysia";
import { prisma } from "@/lib/prisma";

export const client = new Elysia({ prefix: "/client" }).get("/", async () => {
  return await prisma.clients.findMany({
    orderBy: { id: "desc" },
  });
});
