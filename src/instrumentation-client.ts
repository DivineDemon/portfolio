import posthog from "posthog-js";
import { getPostHogProjectToken, getPostHogUiHost } from "@/lib/posthog/config";

const projectToken = getPostHogProjectToken();

if (projectToken) {
  posthog.init(projectToken, {
    api_host: "/ingest",
    ui_host: getPostHogUiHost(),
    person_profiles: "identified_only",
    capture_pageview: false,
    capture_pageleave: true,
    defaults: "2026-05-30",
  });
}
