"use client";

import { useEffect, useRef } from "react";
import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics/track";

type CaseStudyViewTrackerProps = {
  contentType: "project" | "workflow";
  slug: string;
  title: string;
};

const CaseStudyViewTracker = ({
  contentType,
  slug,
  title,
}: CaseStudyViewTrackerProps) => {
  const trackedRef = useRef(false);

  useEffect(() => {
    if (trackedRef.current) {
      return;
    }

    trackedRef.current = true;
    trackEvent(ANALYTICS_EVENTS.CASE_STUDY_VIEW, {
      content_type: contentType,
      item_slug: slug,
      item_title: title,
    });
  }, [contentType, slug, title]);

  return null;
};

export default CaseStudyViewTracker;
