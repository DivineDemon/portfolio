import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

const robots = (): MetadataRoute.Robots => ({
  rules: [
    {
      userAgent: "*",
      allow: "/",
      disallow: ["/og-poster"],
    },
  ],
  sitemap: `${SITE_URL}/sitemap.xml`,
  host: SITE_URL,
});

export default robots;
