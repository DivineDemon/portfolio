"use client";

import { deferUntilIdle } from "@/lib/analytics/defer-until-idle";
import {
  getPostHogProjectToken,
  getPostHogUiHost,
  isPostHogEnabled,
} from "@/lib/posthog/config";

type PostHogClient = typeof import("posthog-js").default;

let initPromise: Promise<PostHogClient | null> | null = null;

export function initPostHogDeferred(): Promise<PostHogClient | null> {
  if (!isPostHogEnabled()) {
    return Promise.resolve(null);
  }

  if (!initPromise) {
    initPromise = new Promise((resolve) => {
      deferUntilIdle(() => {
        void import("posthog-js").then(({ default: posthog }) => {
          const token = getPostHogProjectToken();

          if (token) {
            posthog.init(token, {
              api_host: "/ingest",
              ui_host: getPostHogUiHost(),
              person_profiles: "identified_only",
              capture_pageview: false,
              capture_pageleave: true,
              defaults: "2026-05-30",
            });
          }

          resolve(posthog);
        });
      });
    });
  }

  return initPromise;
}
