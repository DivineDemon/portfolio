import type { Metadata } from "next";
import { Markdown } from "@/components/content/markdown";
import { getPageContent } from "@/lib/data/content";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Privacy",
  description:
    "How this site uses analytics, what data is collected, and your choices.",
  path: "/privacy",
  robots: { index: true, follow: true },
});

export default async function Privacy() {
  const content = await getPageContent("privacy");

  return <Markdown content={content} />;
}
