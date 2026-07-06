import { Markdown } from "@/components/content/markdown";
import { getPageContent } from "@/lib/data/content";

export default async function Home() {
  const content = await getPageContent("about");

  return <Markdown content={content} />;
}
