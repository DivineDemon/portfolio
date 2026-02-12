import { SITE_URL } from "@/lib/constants";

export const PERSON_SCHEMA_ID = `${SITE_URL}#person`;
export const WEBSITE_SCHEMA_ID = `${SITE_URL}#website`;

export function safeJsonLdStringify(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function toAbsoluteUrl(pathOrUrl: string): string {
  if (/^https?:\/\//i.test(pathOrUrl)) {
    return pathOrUrl;
  }

  const normalizedPath = pathOrUrl.startsWith("/")
    ? pathOrUrl
    : `/${pathOrUrl}`;
  return `${SITE_URL}${normalizedPath}`;
}
