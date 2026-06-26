import { Elysia } from "elysia";
import type { ErrorResponse } from "./api-error";
import { client } from "./client";
import { project } from "./project";
import { workflow } from "./workflow";

export const app = new Elysia({ prefix: "/api" })
  .use(project)
  .use(workflow)
  .use(client)
  .onError(({ code, error }) => {
    const message =
      error instanceof Error ? error.message : "An unknown error occurred";

    return {
      message,
      status: `${code}`,
    } satisfies ErrorResponse;
  });

export const GET = app.handle;
