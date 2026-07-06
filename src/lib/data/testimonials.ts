import "server-only";

import { cacheLife, cacheTag } from "next/cache";
import { prisma } from "@/lib/prisma";

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
  cacheLife("hours");

  const clients = await prisma.clients.findMany({
    orderBy: [{ featured: "desc" }, { id: "desc" }],
    select: {
      id: true,
      clientName: true,
      designation: true,
      company: true,
      content: true,
      image: true,
      featured: true,
    },
  });

  const seenContent = new Set<string>();

  return clients.flatMap((client) => {
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
