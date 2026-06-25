import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const portfolioRoot = path.dirname(
  path.dirname(fileURLToPath(import.meta.url)),
);
const backendSchema = path.resolve(
  portfolioRoot,
  "../portfolio-backend/prisma/schema.prisma",
);

if (!fs.existsSync(backendSchema)) {
  console.error(
    [
      "Prisma schema not found at:",
      backendSchema,
      "",
      "Clone portfolio-backend alongside portfolio, then run:",
      "  cd ../portfolio-backend && npm run db:generate",
      "or from portfolio:",
      "  npm run db:generate",
    ].join("\n"),
  );
  process.exit(1);
}

execSync(`npx prisma generate --schema "${backendSchema}"`, {
  cwd: portfolioRoot,
  stdio: "inherit",
});
