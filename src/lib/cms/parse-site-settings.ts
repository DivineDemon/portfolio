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
    heroSubheadline?: string | null;
    heroBadge?: string | null;
  } | null,
) {
  return {
    headline: settings?.heroHeadline?.trim() || HOMEPAGE_DEFAULTS.heroHeadline,
    subheadline:
      settings?.heroSubheadline?.trim() || HOMEPAGE_DEFAULTS.heroSubheadline,
    badgeParts: parseHeroBadgeParts(settings?.heroBadge),
  };
}

export function resolveContactCopy(
  settings: {
    availabilityText?: string | null;
    projectMinimumText?: string | null;
    responseTimeText?: string | null;
  } | null,
) {
  return {
    availabilityText:
      settings?.availabilityText?.trim() || HOMEPAGE_DEFAULTS.availabilityText,
    projectMinimumText:
      settings?.projectMinimumText?.trim() ||
      HOMEPAGE_DEFAULTS.projectMinimumText,
    responseTimeText:
      settings?.responseTimeText?.trim() || HOMEPAGE_DEFAULTS.responseTimeText,
  };
}
