"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { isPostHogEnabled } from "@/lib/posthog/config";
import { initPostHogDeferred } from "@/lib/posthog/init-client";

const PostHogPageView = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!isPostHogEnabled() || !pathname) {
      return;
    }

    let url = window.location.origin + pathname;
    const query = searchParams.toString();

    if (query) {
      url += `?${query}`;
    }

    void initPostHogDeferred().then((posthog) => {
      posthog?.capture("$pageview", { $current_url: url });
    });
  }, [pathname, searchParams]);

  return null;
};

export default PostHogPageView;
