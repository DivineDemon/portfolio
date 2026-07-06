"use client";

import { useEffect } from "react";
import { isPostHogEnabled } from "@/lib/posthog/config";
import { initPostHogDeferred } from "@/lib/posthog/init-client";

const PostHogInit = () => {
  useEffect(() => {
    if (isPostHogEnabled()) {
      void initPostHogDeferred();
    }
  }, []);

  return null;
};

export default PostHogInit;
