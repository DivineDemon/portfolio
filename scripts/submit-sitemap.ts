const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://mushoodhanif.com"
).replace(/\/$/, "");
const sitemapUrl = `${siteUrl}/sitemap.xml`;

const searchEnginePings = [
  {
    name: "Bing",
    url: `https://www.bing.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`,
  },
  {
    name: "Google",
    url: `https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`,
  },
] as const;

async function pingSearchEngine(name: string, pingUrl: string) {
  const response = await fetch(pingUrl, { method: "GET" });

  if (!response.ok) {
    throw new Error(`${name} ping failed with status ${response.status}`);
  }

  console.log(`[ok] ${name} accepted sitemap ping for ${sitemapUrl}`);
}

async function main() {
  console.log(`Submitting sitemap: ${sitemapUrl}`);

  const sitemapResponse = await fetch(sitemapUrl);
  if (!sitemapResponse.ok) {
    throw new Error(
      `Sitemap is not reachable at ${sitemapUrl} (status ${sitemapResponse.status})`,
    );
  }

  console.log("[ok] Sitemap is reachable");

  for (const engine of searchEnginePings) {
    try {
      await pingSearchEngine(engine.name, engine.url);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unknown ping error";
      console.warn(
        `[warn] ${message} (legacy ping endpoints are often deprecated; use the consoles below)`,
      );
    }
  }

  console.log("");
  console.log("Manual follow-up:");
  console.log(
    `- Google Search Console: https://search.google.com/search-console → Sitemaps → add ${sitemapUrl}`,
  );
  console.log(
    `- Bing Webmaster Tools: https://www.bing.com/webmasters → Sitemaps → submit ${sitemapUrl}`,
  );
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
