"use client";

import { useReportWebVitals } from "next/web-vitals";
import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics/track";

const WebVitals = () => {
  useReportWebVitals((metric) => {
    trackEvent(ANALYTICS_EVENTS.WEB_VITAL, {
      metric_name: metric.name,
      metric_value: metric.value,
      metric_rating: metric.rating,
      metric_id: metric.id,
      metric_navigation_type: metric.navigationType,
    });
  });

  return null;
};

export default WebVitals;
