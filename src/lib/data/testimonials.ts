import "server-only";

import { cacheLife, cacheTag } from "next/cache";
import { getCmsClients } from "@/lib/data/cms-store";

const EXCLUDED_CLIENT_NAMES = ["farrukh iminov"];

export type Testimonial = {
  id: number;
  clientName: string;
  designation: string;
  company: string;
  content: string;
  image: string | null;
  featured: boolean;
};

function normalizeClientName(name: string): string {
  return name.trim().toLowerCase();
}

function normalizeContent(content: string): string {
  return content.trim().toLowerCase();
}

export async function getTestimonials(): Promise<Testimonial[]> {
  "use cache";
  cacheTag("testimonials");
  cacheLife("max");

  const seenContent = new Set<string>();

  return getCmsClients().flatMap((client) => {
    if (!client.content?.trim()) {
      return [];
    }

    if (
      EXCLUDED_CLIENT_NAMES.includes(normalizeClientName(client.clientName))
    ) {
      return [];
    }

    const contentKey = normalizeContent(client.content);
    if (seenContent.has(contentKey)) {
      return [];
    }

    seenContent.add(contentKey);
    return [client];
  });
}
