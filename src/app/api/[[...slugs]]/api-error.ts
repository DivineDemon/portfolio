import { t } from "elysia";

export const errorResponseSchema = t.Object({
  status: t.String(),
  message: t.String(),
});

export type ErrorResponse = typeof errorResponseSchema.static;
