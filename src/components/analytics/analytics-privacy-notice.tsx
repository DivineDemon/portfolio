"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "analytics-privacy-notice-dismissed";
const SCROLL_DISMISS_THRESHOLD_PX = 100;
const MAIN_SCROLL_ID = "main-scroll";

const AnalyticsPrivacyNotice = () => {
  const [visible, setVisible] = useState(false);

  const dismiss = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, "true");
    setVisible(false);
  }, []);

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY) === "true") {
      return;
    }
    setVisible(true);
  }, []);

  useEffect(() => {
    if (!visible) {
      return;
    }

    const handleScroll = (event: Event) => {
      const target = event.target;

      if (!(target instanceof HTMLElement)) {
        return;
      }

      if (target.scrollTop >= SCROLL_DISMISS_THRESHOLD_PX) {
        dismiss();
      }
    };

    const scrollContainer = document.getElementById(MAIN_SCROLL_ID);

    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll, {
        passive: true,
      });
      return () => scrollContainer.removeEventListener("scroll", handleScroll);
    }

    const handleWindowScroll = () => {
      if (window.scrollY >= SCROLL_DISMISS_THRESHOLD_PX) {
        dismiss();
      }
    };

    window.addEventListener("scroll", handleWindowScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleWindowScroll);
  }, [visible, dismiss]);

  if (!visible) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Privacy notice"
      className="fixed inset-x-0 bottom-0 z-50 border-t bg-background/95 p-3 shadow-lg backdrop-blur supports-backdrop-filter:bg-background/80"
    >
      <div className="mx-auto flex max-w-4xl flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <p className="text-sm leading-relaxed text-muted-foreground">
          This site uses analytics to understand traffic and improve the
          experience.{" "}
          <Link
            href="/privacy"
            onClick={dismiss}
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            Privacy policy
          </Link>
        </p>
        <button
          type="button"
          onClick={dismiss}
          className="shrink-0 self-start text-sm text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline sm:self-center"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
};

export default AnalyticsPrivacyNotice;
