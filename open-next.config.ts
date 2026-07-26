import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

// Prerendered pages + use cache: serve from Workers static assets (no KV/R2 needed).
export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
});
