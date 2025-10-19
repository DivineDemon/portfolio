import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";

import { caseStudyRouter } from "./routers/case-study";
import { documentRouter } from "./routers/document";
import { projectRouter } from "./routers/project";
import { testimonialRouter } from "./routers/testimonial";

export const appRouter = createTRPCRouter({
  project: projectRouter,
  testimonial: testimonialRouter,
  caseStudy: caseStudyRouter,
  document: documentRouter,
});

export type AppRouter = typeof appRouter;
export const createCaller = createCallerFactory(appRouter);
