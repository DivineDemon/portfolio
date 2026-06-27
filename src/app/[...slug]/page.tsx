import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import {
  CmsMarkdownPage,
  WorkIndexPage,
} from "@/components/cms/cms-page-views";
import {
  getPublishedPageBySlug,
  getPublishedPages,
} from "@/lib/cms/get-published-pages";
import { SITE_URL } from "@/lib/constants";
import { safeJsonLdStringify, WEBSITE_SCHEMA_ID } from "@/lib/json-ld";

function joinSlug(slug: string[]) {
  return slug.join("/");
}

function isExcludedCmsPage(slug: string, pageType: string) {
  return (
    pageType === "service" ||
    slug === "services" ||
    slug.startsWith("services/") ||
    pageType === "now" ||
    slug === "now" ||
    pageType === "process" ||
    slug === "process"
  );
}

export async function generateStaticParams() {
  const pages = await getPublishedPages();
  const routablePages = pages.filter(
    (page) => !isExcludedCmsPage(page.slug, page.pageType),
  );

  if (routablePages.length > 0) {
    return routablePages.map((page) => ({
      slug: page.slug.split("/"),
    }));
  }

  // Cache Components requires at least one param at build time.
  return [{ slug: ["privacy"] }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const slugPath = joinSlug(slug);
  const page = await getPublishedPageBySlug(slugPath);

  if (!page) {
    return { title: "Page not found" };
  }

  const title = page.seoTitle ?? page.title;
  const description = page.seoDescription ?? page.excerpt ?? undefined;
  const canonical = `${SITE_URL}/${slugPath}`;

  return {
    title,
    description,
    keywords: page.keywords?.length ? page.keywords : undefined,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "website",
      siteName: "Mushood Hanif",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: { index: true, follow: true },
  };
}

export default async function CmsPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const slugPath = joinSlug(slug);
  const page = await getPublishedPageBySlug(slugPath);

  if (!page || isExcludedCmsPage(page.slug, page.pageType)) {
    notFound();
  }

  const canonical = `${SITE_URL}/${slugPath}`;
  const title = page.seoTitle ?? page.title;
  const description = page.seoDescription ?? page.excerpt ?? "";

  const pageJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": `${canonical}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: SITE_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: page.title,
            item: canonical,
          },
        ],
      },
      {
        "@type": "WebPage",
        "@id": `${canonical}#webpage`,
        name: title,
        description,
        url: canonical,
        isPartOf: { "@id": WEBSITE_SCHEMA_ID },
      },
    ],
  };

  let content: ReactNode;

  if (page.slug === "work") {
    content = <WorkIndexPage page={page} />;
  } else {
    content = <CmsMarkdownPage page={page} />;
  }

  return (
    <>
      <script type="application/ld+json">
        {safeJsonLdStringify(pageJsonLd)}
      </script>
      {content}
    </>
  );
}
