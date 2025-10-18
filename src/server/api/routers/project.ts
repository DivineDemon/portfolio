import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const projectRouter = createTRPCRouter({
  getProjects: publicProcedure.query(async ({ ctx }) => {
    const projects = await ctx.db.projects.findMany();

    return projects.map((project) => ({
      id: project.id,
      image: project.image,
      features: project.features,
      link: project.link,
      start_year: project.start_year,
      project_name: project.project_name,
      company_id: 1,
      companies: {
        id: 1,
        name: (project as { company?: string }).company || "Unknown Company",
        hq: "Unknown",
        founded: 2000,
        industry: "Unknown",
        revenue: "Unknown",
        size: "Unknown",
        ceo_name: "Unknown",
        ceo_title: "Unknown",
      },
    }));
  }),
});
