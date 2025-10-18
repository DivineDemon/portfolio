import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const projectRouter = createTRPCRouter({
  getProjects: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.projects.findMany({
      include: {
        companies: true,
      },
    });
  }),
});
