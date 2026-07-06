import { Markdown } from "@/components/content/markdown";
import { JsonLd } from "@/components/seo/json-ld";
import { getPageContent } from "@/lib/data/content";
import { ABOUT_FAQ_ITEMS } from "@/lib/seo/about-faq";
import { buildFaqPageJsonLd } from "@/lib/seo/faq-json-ld";
import { absoluteUrl } from "@/lib/seo/metadata";

export default async function Home() {
  const content = await getPageContent("about");
  const faqJsonLd = buildFaqPageJsonLd(ABOUT_FAQ_ITEMS, absoluteUrl("/"));

  return (
    <>
      <JsonLd data={faqJsonLd} />
      <Markdown content={content} />
    </>
  );
}
