import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const caseStudyRouter = createTRPCRouter({
  getCaseStudyByProjectId: publicProcedure
    .input(z.object({ projectId: z.number() }))
    .query(async ({ ctx, input }): Promise<CaseStudyProps | null> => {
      const caseStudy = await ctx.db.case_studies.findUnique({
        where: {
          project_id: input.projectId,
        },
        include: {
          projects: {
            include: {
              companies: {
                select: {
                  name: true,
                  hq: true,
                  founded: true,
                  industry: true,
                  revenue: true,
                  size: true,
                  ceo_name: true,
                  ceo_title: true,
                },
              },
            },
            select: {
              project_name: true,
            },
          },
        },
      });

      if (!caseStudy) return null;

      return caseStudy as CaseStudyProps;
    }),
});
