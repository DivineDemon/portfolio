"use client";

import { Analytics as VercelAnalytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import AnalyticsPrivacyNotice from "@/components/analytics/analytics-privacy-notice";
import PostHogInit from "@/components/analytics/posthog-init";
import PostHogPageView from "@/components/analytics/posthog-pageview";
import { isPostHogEnabled } from "@/lib/posthog/config";

const WebVitals = dynamic(() => import("@/components/analytics/web-vitals"), {
  ssr: false,
});

function hasAnalyticsPrivacyNotice() {
  return (
    Boolean(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID) || isPostHogEnabled()
  );
}

const Analytics = () => {
  return (
    <>
      <VercelAnalytics />
      <SpeedInsights />
      <WebVitals />
      {isPostHogEnabled() ? (
        <>
          <PostHogInit />
          <Suspense fallback={null}>
            <PostHogPageView />
          </Suspense>
        </>
      ) : null}
      {hasAnalyticsPrivacyNotice() ? <AnalyticsPrivacyNotice /> : null}
    </>
  );
};

export default Analytics;
