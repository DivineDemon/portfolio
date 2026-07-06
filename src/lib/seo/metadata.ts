import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";
import {
  DEFAULT_OG_IMAGE,
  OG_IMAGE_METADATA,
  SITE_SEO_DEFAULTS,
} from "@/lib/seo/defaults";

export function canonicalPath(path: string): string {
  if (path === "/") {
    return "/";
  }

  const normalized = path.startsWith("/") ? path : `/${path}`;
  return normalized.endsWith("/") ? normalized.slice(0, -1) : normalized;
}

export function absoluteUrl(path: string): string {
  const normalized = canonicalPath(path);
  return normalized === "/" ? SITE_URL : `${SITE_URL}${normalized}`;
}

type PageMetadataInput = {
  title: string;
  description?: string;
  path: string;
  keywords?: string[];
  openGraph?: NonNullable<Metadata["openGraph"]>;
  twitter?: NonNullable<Metadata["twitter"]>;
  robots?: Metadata["robots"];
};

export function buildPageMetadata({
  title,
  description = SITE_SEO_DEFAULTS.positioningDescription,
  path,
  keywords,
  openGraph,
  twitter,
  robots,
}: PageMetadataInput): Metadata {
  const canonical = canonicalPath(path);
  const url = absoluteUrl(canonical);

  return {
    title,
    description,
    keywords,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      siteName: "Mushood Hanif",
      locale: "en_US",
      type: "website",
      url,
      images: [OG_IMAGE_METADATA],
      ...openGraph,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [DEFAULT_OG_IMAGE],
      ...twitter,
    },
    robots: robots ?? {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export const rootMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_SEO_DEFAULTS.positioningTitle,
    template: "%s | Mushood Hanif",
  },
  description: SITE_SEO_DEFAULTS.positioningDescription,
  applicationName: "Mushood Hanif",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: SITE_SEO_DEFAULTS.openGraphTitle,
    description: SITE_SEO_DEFAULTS.openGraphDescription,
    url: SITE_URL,
    siteName: "Mushood Hanif",
    locale: "en_US",
    type: "website",
    images: [OG_IMAGE_METADATA],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_SEO_DEFAULTS.twitterTitle,
    description: SITE_SEO_DEFAULTS.twitterDescription,
    images: [DEFAULT_OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  ...(process.env.GOOGLE_SITE_VERIFICATION
    ? {
        verification: {
          google: process.env.GOOGLE_SITE_VERIFICATION,
        },
      }
    : {}),
};
