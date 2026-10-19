import type { Metadata } from "next";

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://mushoodhanif.com").replace(
  /\/$/,
  "",
);

export const SITE_NAME = "Mushood Hanif Portfolio";

export const DEFAULT_TITLE = "Mushood Hanif — Founder & AI Systems Architect | Senior AI Engineer";

export const DEFAULT_DESCRIPTION =
  "Founder & AI Systems Architect. Building multi-agent LLM infrastructure, real-time ML pipelines, and physical AI systems.";

export const DEFAULT_OG_IMAGE = "/og-image.png";

export const DEFAULT_KEYWORDS = [
  "Mushood Hanif",
  "AI Engineer",
  "AI Systems Architect",
  "Haga Labs",
  "Afiniti",
  "LangGraph",
  "LLM",
  "MLOps",
  "PyTorch",
  "RAG",
];

export function absoluteUrl(pathname: string): string {
  if (pathname.startsWith("http")) return pathname;
  return `${SITE_URL}${pathname.startsWith("/") ? "" : "/"}${pathname}`;
}

interface CreateMetadataOptions {
  title: string;
  description?: string;
  path: string;
  image?: string;
  type?: "website" | "article" | "profile";
  publishedTime?: string;
  tags?: string[];
  noIndex?: boolean;
}

export function createMetadata({
  title,
  description = DEFAULT_DESCRIPTION,
  path,
  image = DEFAULT_OG_IMAGE,
  type = "website",
  publishedTime,
  tags = [],
  noIndex = false,
}: CreateMetadataOptions): Metadata {
  const url = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);

  return {
    title: { absolute: title },
    description,
    keywords: [...DEFAULT_KEYWORDS, ...tags],
    alternates: {
      canonical: url,
    },
    openGraph: {
      type,
      url,
      title,
      description,
      siteName: SITE_NAME,
      locale: "en_US",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      ...(type === "article" ? { publishedTime, tags } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
      creator: "@mushoodhanif",
      site: "@mushoodhanif",
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
  };
}
