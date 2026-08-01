/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
/// <reference types="@cloudflare/workers-types" />

declare namespace App {
  interface Locals {
    runtime: {
      env: {
        DB?: D1Database;
        [key: string]: unknown;
      };
      cf?: Record<string, unknown>;
      ctx?: unknown;
    };
  }
}
