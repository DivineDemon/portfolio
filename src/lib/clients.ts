import type { clients } from "@/generated/prisma/client";

const EXCLUDED_CLIENT_NAMES = ["farrukh iminov"];

function normalizeClientName(name: string): string {
  return name.trim().toLowerCase();
}

function normalizeContent(content: string): string {
  return content.trim().toLowerCase();
}

/** Public-site filter: drop irrelevant entries and duplicate quotes. */
export function filterPublicClients(items: clients[]): clients[] {
  const seenContent = new Set<string>();

  return items.filter((client) => {
    if (!client.content?.trim()) {
      return false;
    }

    if (
      EXCLUDED_CLIENT_NAMES.includes(normalizeClientName(client.clientName))
    ) {
      return false;
    }

    const contentKey = normalizeContent(client.content);
    if (seenContent.has(contentKey)) {
      return false;
    }

    seenContent.add(contentKey);
    return true;
  });
}
