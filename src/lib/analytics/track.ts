"use client";

import { sendGAEvent } from "@next/third-parties/google";
import {
  ANALYTICS_EVENTS,
  type AnalyticsEventName,
} from "@/lib/analytics/events";
import { isPostHogEnabled } from "@/lib/posthog/config";

export { ANALYTICS_EVENTS };

type AnalyticsParams = Record<string, string | number | boolean | undefined>;

export function trackEvent(
  eventName: AnalyticsEventName,
  params?: AnalyticsParams,
) {
  const hasGa = Boolean(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID);
  const hasPosthog = isPostHogEnabled();

  if (!hasGa && !hasPosthog) {
    return;
  }

  const cleanedParams = params
    ? Object.fromEntries(
        Object.entries(params).filter(([, value]) => value !== undefined),
      )
    : undefined;

  if (hasGa) {
    sendGAEvent("event", eventName, cleanedParams ?? {});
  }

  if (hasPosthog) {
    void import("posthog-js").then(({ default: posthog }) => {
      posthog.capture(eventName, cleanedParams);
    });
  }
}
