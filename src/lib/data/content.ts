import "server-only";

import { readFile } from "node:fs/promises";
import path from "node:path";
import { cacheLife, cacheTag } from "next/cache";

export async function getPageContent(page: string): Promise<string> {
  "use cache";
  cacheTag("content", `content-${page}`);
  cacheLife("max");

  return readFile(path.join(process.cwd(), `docs/content/${page}.md`), "utf8");
}
