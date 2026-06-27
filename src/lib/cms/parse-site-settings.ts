import { HOMEPAGE_DEFAULTS } from "@/lib/seo/defaults";

export function parseWhoThisIsFor(whoThisIsFor: unknown): string[] {
  if (!Array.isArray(whoThisIsFor)) {
    return [...HOMEPAGE_DEFAULTS.whoThisIsFor];
  }

  const bullets = whoThisIsFor.filter(
    (item): item is string =>
      typeof item === "string" && item.trim().length > 0,
  );

  return bullets.length > 0 ? bullets : [...HOMEPAGE_DEFAULTS.whoThisIsFor];
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

export function resolveHeroCopy(
  settings: {
    heroHeadline?: string | null;
    heroBadge?: string | null;
  } | null,
) {
  return {
    headline: settings?.heroHeadline?.trim() || HOMEPAGE_DEFAULTS.heroHeadline,
    badgeParts: parseHeroBadgeParts(settings?.heroBadge),
  };
}
