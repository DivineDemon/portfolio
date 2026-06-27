import { HOMEPAGE_DEFAULTS } from "@/lib/seo/defaults";

export function getWhoThisIsForBullets(): string[] {
  return [...HOMEPAGE_DEFAULTS.whoThisIsFor];
}

export function parseHeroBadgeParts(
  heroBadge: string | null | undefined,
): string[] {
  const badge = heroBadge?.trim() || HOMEPAGE_DEFAULTS.heroBadge;
  const parts = badge
    .split(/\s*·\s*/)
    .map((part) => part.trim())
    .filter(Boolean);

  return parts.length > 0 ? parts : [badge];
}

export function getHeroCopy() {
  return {
    headline: HOMEPAGE_DEFAULTS.heroHeadline,
    badgeParts: parseHeroBadgeParts(HOMEPAGE_DEFAULTS.heroBadge),
  };
}
