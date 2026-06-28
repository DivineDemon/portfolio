import { cacheLife } from "next/cache";
import { SITE_URL } from "@/lib/constants";
import {
  PERSON_SCHEMA_ID,
  toAbsoluteUrl,
  WEBSITE_SCHEMA_ID,
} from "@/lib/json-ld";
import { SITE_SEO_DEFAULTS } from "@/lib/seo/defaults";

export async function getSiteJsonLd() {
  "use cache";
  cacheLife("hours");

  const jobTitle = SITE_SEO_DEFAULTS.heroBadge;
  const description = SITE_SEO_DEFAULTS.positioningDescription;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": PERSON_SCHEMA_ID,
        name: "Mushood Hanif",
        url: SITE_URL,
        image: toAbsoluteUrl("/og-image.png"),
        jobTitle,
        description,
        knowsAbout: [...SITE_SEO_DEFAULTS.knowsAbout],
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_SCHEMA_ID,
        url: SITE_URL,
        name: "Mushood Hanif",
        description,
        inLanguage: "en-US",
        publisher: { "@id": PERSON_SCHEMA_ID },
      },
    ],
  };
}

export async function getHomePageJsonLd() {
  "use cache";
  cacheLife("hours");

  const title = SITE_SEO_DEFAULTS.positioningTitle;
  const description = SITE_SEO_DEFAULTS.positioningDescription;

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${SITE_URL}#webpage`,
    url: SITE_URL,
    name: title,
    description,
    inLanguage: "en-US",
    isPartOf: {
      "@id": WEBSITE_SCHEMA_ID,
    },
    about: {
      "@id": PERSON_SCHEMA_ID,
    },
  };
}
