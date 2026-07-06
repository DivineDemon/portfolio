"use client";

import { Analytics as VercelAnalytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Suspense } from "react";
import AnalyticsPrivacyNotice from "@/components/analytics/analytics-privacy-notice";
import PostHogPageView from "@/components/analytics/posthog-pageview";
import WebVitals from "@/components/analytics/web-vitals";
import { isPostHogEnabled } from "@/lib/posthog/config";

function hasAnalyticsPrivacyNotice() {
  return (
    Boolean(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID) ||
    Boolean(process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID) ||
    isPostHogEnabled()
  );
}

const Analytics = () => {
  return (
    <>
      <VercelAnalytics />
      <SpeedInsights />
      <WebVitals />
      {isPostHogEnabled() ? (
        <Suspense fallback={null}>
          <PostHogPageView />
        </Suspense>
      ) : null}
      {hasAnalyticsPrivacyNotice() ? <AnalyticsPrivacyNotice /> : null}
    </>
  );
};

export default Analytics;
