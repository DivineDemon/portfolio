import { SITE_URL } from "@/lib/constants";
import {
  PERSON_SCHEMA_ID,
  toAbsoluteUrl,
  toIsoDate,
  WEBSITE_SCHEMA_ID,
} from "@/lib/json-ld";

type BreadcrumbItem = { name: string; href: string };

type ArticleJsonLdInput = {
  canonical: string;
  title: string;
  description?: string;
  imageUrl?: string;
  publishedAt?: unknown;
  updatedAt?: unknown;
  keywords?: string[];
  breadcrumbs: BreadcrumbItem[];
};

export function buildArticleJsonLd({
  canonical,
  title,
  description,
  imageUrl,
  publishedAt,
  updatedAt,
  keywords,
  breadcrumbs,
}: ArticleJsonLdInput) {
  const datePublished = toIsoDate(publishedAt);
  const dateModified = toIsoDate(updatedAt);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": `${canonical}#breadcrumb`,
        itemListElement: breadcrumbs.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: item.href.startsWith("http")
            ? item.href
            : `${SITE_URL}${item.href}`,
        })),
      },
      {
        "@type": "Article",
        "@id": `${canonical}#article`,
        headline: title,
        description,
        url: canonical,
        mainEntityOfPage: canonical,
        isPartOf: { "@id": WEBSITE_SCHEMA_ID },
        ...(imageUrl ? { image: [imageUrl] } : {}),
        author: { "@id": PERSON_SCHEMA_ID },
        publisher: { "@id": PERSON_SCHEMA_ID },
        ...(datePublished ? { datePublished } : {}),
        ...(dateModified ? { dateModified } : {}),
        ...(keywords?.length ? { keywords: keywords.join(", ") } : {}),
      },
    ],
  };
}

export function resolveImageUrl(image?: string | null): string | undefined {
  return image ? toAbsoluteUrl(image) : undefined;
}
