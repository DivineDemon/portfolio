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
        select: {
          id: true,
          project_id: true,
          title: true,
          description: true,
          challenge: true,
          results: true,
          onboarding_improved: true,
          retention_increase: true,
          time_spent_increase: true,
          research: true,
          architecture: true,
          wireframing: true,
          testing: true,
          design: true,
          tech_stack_urls: true,
          ceo_statement: true,
          conclusion: true,
          images: true,
          projects: {
            select: {
              project_name: true,
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
          },
        },
      });

      if (!caseStudy) return null;

      return caseStudy as CaseStudyProps;
    }),
});
