import { treaty } from "@elysiajs/eden";
import type { app } from "@/app/api/[[...slugs]]/route";

export const client = treaty<typeof app>(
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000",
).api;
