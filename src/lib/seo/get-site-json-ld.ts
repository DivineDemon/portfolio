import { cacheLife, cacheTag } from "next/cache";
import type { clients } from "@/generated/prisma/client";
import { getClients } from "@/lib/cms/get-clients";
import { getSiteSettings } from "@/lib/cms/get-site-settings";
import { SITE_URL } from "@/lib/constants";
import {
  PERSON_SCHEMA_ID,
  toAbsoluteUrl,
  WEBSITE_SCHEMA_ID,
} from "@/lib/json-ld";
import { SITE_SEO_DEFAULTS } from "@/lib/seo/defaults";

const PROFESSIONAL_SERVICE_SCHEMA_ID = `${SITE_URL}#professional-service`;

function getReviewBody(client: clients): string | null {
  const reviewBody = client.feedback?.trim() || client.content?.trim();
  return reviewBody || null;
}

function buildReviewSchema(client: clients, index: number) {
  const reviewBody = getReviewBody(client);
  if (!reviewBody) {
    return null;
  }

  return {
    "@type": "Review" as const,
    "@id": `${SITE_URL}#review-${index + 1}`,
    author: {
      "@type": "Person" as const,
      name: client.clientName,
      ...(client.designation ? { jobTitle: client.designation } : {}),
      ...(client.company
        ? {
            worksFor: {
              "@type": "Organization" as const,
              name: client.company,
            },
          }
        : {}),
    },
    reviewBody,
    itemReviewed: {
      "@id": PERSON_SCHEMA_ID,
    },
  };
}

export async function getSiteJsonLd() {
  "use cache";
  cacheTag("cms:settings", "cms:clients");
  cacheLife("hours");

  const [settings, clients] = await Promise.all([
    getSiteSettings(),
    getClients(),
  ]);

  const jobTitle =
    settings?.heroBadge?.trim() ??
    settings?.positioningTitle?.trim() ??
    SITE_SEO_DEFAULTS.heroBadge;
  const description =
    settings?.positioningDescription?.trim() ??
    SITE_SEO_DEFAULTS.positioningDescription;
  const sameAs = [settings?.linkedinUrl, settings?.githubUrl].filter(
    (url): url is string => typeof url === "string" && url.trim().length > 0,
  );

  const reviews = clients
    .map((client, index) => buildReviewSchema(client, index))
    .filter((review): review is NonNullable<typeof review> => review !== null);

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
        ...(sameAs.length > 0 ? { sameAs } : {}),
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
      {
        "@type": "ProfessionalService",
        "@id": PROFESSIONAL_SERVICE_SCHEMA_ID,
        name: "Mushood Hanif",
        url: SITE_URL,
        description,
        provider: { "@id": PERSON_SCHEMA_ID },
        areaServed: "Worldwide",
        serviceType: [...SITE_SEO_DEFAULTS.serviceTypes],
      },
      ...reviews,
    ],
  };
}

export async function getHomePageJsonLd() {
  "use cache";
  cacheTag("cms:settings");
  cacheLife("hours");

  const settings = await getSiteSettings();
  const title =
    settings?.positioningTitle?.trim() ?? SITE_SEO_DEFAULTS.positioningTitle;
  const description =
    settings?.positioningDescription?.trim() ??
    SITE_SEO_DEFAULTS.positioningDescription;

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
