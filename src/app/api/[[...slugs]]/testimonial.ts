import Elysia from "elysia";
import { prisma } from "@/lib/prisma";

export const testimonial = new Elysia({ prefix: "/testimonial" }).get(
  "/",
  async () => {
    return await prisma.testimonials.findMany();
  },
);
