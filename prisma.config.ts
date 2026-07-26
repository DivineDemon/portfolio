import "dotenv/config";
import { defineConfig } from "prisma/config";

// Use process.env (not env()) so `prisma generate` works during install/CI
// when DATABASE_URL is not available yet. Runtime still requires a real URL.
const databaseUrl =
  process.env.DATABASE_URL ??
  "postgresql://prisma:prisma@127.0.0.1:5432/prisma?schema=public";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: databaseUrl,
  },
});
