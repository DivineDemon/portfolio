const DEPRECATED_SLUGS = new Set(["services", "now", "process", "work"]);
const DEPRECATED_PAGE_TYPES = new Set(["service", "now", "process", "index"]);

export function isDeprecatedCmsPage(slug: string, pageType: string): boolean {
  if (DEPRECATED_PAGE_TYPES.has(pageType)) {
    return true;
  }

  if (DEPRECATED_SLUGS.has(slug)) {
    return true;
  }

  return slug.startsWith("services/");
}

const DEAD_MARKDOWN_LINK_PATTERN =
  /\[([^\]]+)\]\(\/(?:services(?:\/[^)]*)?|now|work)(?:[#?][^)]*)?\)/gi;

export function sanitizeDeprecatedMarkdownLinks(content: string): string {
  if (!content || !DEAD_MARKDOWN_LINK_PATTERN.test(content)) {
    return content;
  }

  DEAD_MARKDOWN_LINK_PATTERN.lastIndex = 0;

  return content.replace(DEAD_MARKDOWN_LINK_PATTERN, "$1");
}
