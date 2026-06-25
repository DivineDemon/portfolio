import type { testimonials } from "@/generated/prisma/client";

const EXCLUDED_CLIENT_NAMES = ["farrukh iminov"];

function normalizeClientName(name: string): string {
  return name.trim().toLowerCase();
}

function normalizeContent(content: string): string {
  return content.trim().toLowerCase();
}

/** Public-site filter: drop irrelevant entries and duplicate quotes. */
export function filterPublicTestimonials(
  items: testimonials[],
): testimonials[] {
  const seenContent = new Set<string>();

  return items.filter((testimonial) => {
    if (
      EXCLUDED_CLIENT_NAMES.includes(
        normalizeClientName(testimonial.client_name),
      )
    ) {
      return false;
    }

    const contentKey = normalizeContent(testimonial.content);
    if (seenContent.has(contentKey)) {
      return false;
    }

    seenContent.add(contentKey);
    return true;
  });
}
