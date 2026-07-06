"use client";

import { useEffect, useRef } from "react";
import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics/track";

type BlogPostViewTrackerProps = {
  slug: string;
  title: string;
};

const BlogPostViewTracker = ({ slug, title }: BlogPostViewTrackerProps) => {
  const trackedRef = useRef(false);

  useEffect(() => {
    if (trackedRef.current) {
      return;
    }

    trackedRef.current = true;
    trackEvent(ANALYTICS_EVENTS.BLOG_POST_VIEW, {
      item_slug: slug,
      item_title: title,
    });
  }, [slug, title]);

  return null;
};

export default BlogPostViewTracker;
