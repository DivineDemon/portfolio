"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics/track";

type AnalyticsEventName = Parameters<typeof trackEvent>[0];
type AnalyticsEventParams = Parameters<typeof trackEvent>[1];

type TrackedLinkProps = ComponentProps<typeof Link> & {
  eventName: AnalyticsEventName;
  eventParams?: AnalyticsEventParams;
};

const TrackedLink = ({
  eventName,
  eventParams,
  onClick,
  ...props
}: TrackedLinkProps) => {
  return (
    <Link
      {...props}
      onClick={(event) => {
        trackEvent(eventName, eventParams);
        onClick?.(event);
      }}
    />
  );
};

export default TrackedLink;

export function trackCtaClick(ctaLabel: string, ctaLocation: string) {
  trackEvent(ANALYTICS_EVENTS.CTA_CLICK, {
    cta_label: ctaLabel,
    cta_location: ctaLocation,
  });
}
