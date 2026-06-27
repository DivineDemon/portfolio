"use client";

import { sendGAEvent } from "@next/third-parties/google";
import {
  ANALYTICS_EVENTS,
  type AnalyticsEventName,
} from "@/lib/analytics/events";

export { ANALYTICS_EVENTS };

type AnalyticsParams = Record<string, string | number | boolean | undefined>;

export function trackEvent(
  eventName: AnalyticsEventName,
  params?: AnalyticsParams,
) {
  if (!process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID) {
    return;
  }

  const cleanedParams = params
    ? Object.fromEntries(
        Object.entries(params).filter(([, value]) => value !== undefined),
      )
    : undefined;

  sendGAEvent("event", eventName, cleanedParams ?? {});
}
