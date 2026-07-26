import "server-only";

import { cacheLife, cacheTag } from "next/cache";
import pages from "@/data/pages.json";

type PagesDump = Record<string, string>;

const pageContent = pages as PagesDump;

export async function getPageContent(page: string): Promise<string> {
  "use cache";
  cacheTag("content", `content-${page}`);
  cacheLife("max");

  const content = pageContent[page];
  if (typeof content !== "string") {
    throw new Error(`Unknown content page: ${page}`);
  }

  return content;
}
