import { cacheLife, cacheTag } from "next/cache";
import { prisma } from "@/lib/prisma";

const SITE_SETTINGS_ID = 1;

export async function getSiteSettings() {
  "use cache";
  cacheTag("cms:settings");
  cacheLife("hours");

  return prisma.site_settings.findUnique({
    where: { id: SITE_SETTINGS_ID },
  });
}
