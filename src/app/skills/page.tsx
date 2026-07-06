import type { Metadata } from "next";
import { Markdown } from "@/components/content/markdown";
import { getPageContent } from "@/lib/data/content";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Skills",
  description:
    "Technical stack, tools, and capabilities across fullstack engineering, AI systems, and automation.",
  path: "/skills",
});

export default async function Skills() {
  const content = await getPageContent("skills");

  return <Markdown content={content} />;
}
