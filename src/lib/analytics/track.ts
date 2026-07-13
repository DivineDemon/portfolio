"use client";

import { sendGAEvent } from "@next/third-parties/google";
import {
  ANALYTICS_EVENTS,
  type AnalyticsEventName,
} from "@/lib/analytics/events";
import { isPostHogEnabled } from "@/lib/posthog/config";
import { initPostHogDeferred } from "@/lib/posthog/init-client";

export { ANALYTICS_EVENTS };

type AnalyticsParams = Record<string, string | number | boolean | undefined>;

function pushGtagEvent(...args: unknown[]) {
  if (typeof window === "undefined") {
    return;
  }

  window.dataLayer = window.dataLayer || [];
  // gtag pushes argument objects onto dataLayer
  window.dataLayer.push(args);
}

export function trackGoogleAdsConversion(
  sendTo = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_SEND_TO,
) {
  if (!sendTo) {
    return;
  }

  pushGtagEvent("event", "conversion", { send_to: sendTo });
}

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
    void initPostHogDeferred().then((posthog) => {
      posthog?.capture(eventName, cleanedParams);
    });
  }
}

type LeadConversionParams = {
  form_location: string;
  currency?: string;
  value?: number;
};

export function trackLeadConversion({
  form_location,
  currency = "USD",
  value = 1,
}: LeadConversionParams) {
  const params = { form_location, currency, value };

  trackEvent(ANALYTICS_EVENTS.LEAD_FORM_SUBMIT, params);
  trackEvent(ANALYTICS_EVENTS.GENERATE_LEAD, params);
  trackGoogleAdsConversion();
}
