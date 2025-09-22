import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";

import { projectRouter } from "./routers/project";
import { testimonialRouter } from "./routers/testimonial";

export const appRouter = createTRPCRouter({
  project: projectRouter,
  testimonial: testimonialRouter,
});

export type AppRouter = typeof appRouter;
export const createCaller = createCallerFactory(appRouter);
