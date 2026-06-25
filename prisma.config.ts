import "dotenv/config";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "prisma/config";

const portfolioRoot = path.dirname(fileURLToPath(import.meta.url));
const backendSchema = path.resolve(
  portfolioRoot,
  "../portfolio-backend/prisma/schema.prisma",
);

export default defineConfig({
  schema: backendSchema,
  datasource: {
    url: process.env.DATABASE_URL,
  },
});
