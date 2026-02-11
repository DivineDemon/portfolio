import { Elysia } from "elysia";
import type { ErrorResponse } from "./api-error";
import { project } from "./project";
import { testimonial } from "./testimonial";

export const app = new Elysia({ prefix: "/api" })
  .use(project)
  .use(testimonial)
  .onError(({ code, error }) => {
    const message =
      error instanceof Error ? error.message : "An unknown error occurred";

    return {
      message,
      status: `${code}`,
    } satisfies ErrorResponse;
  });

export const GET = app.handle;
