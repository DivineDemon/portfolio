"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const STORAGE_KEY = "analytics-privacy-notice-dismissed";

type AnalyticsPrivacyNoticeProps = {
  b2bProvider?: string;
};

const AnalyticsPrivacyNotice = ({
  b2bProvider,
}: AnalyticsPrivacyNoticeProps) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY) === "true") {
      return;
    }
    setVisible(true);
  }, []);

  if (!visible) {
    return null;
  }

  const dismiss = () => {
    localStorage.setItem(STORAGE_KEY, "true");
    setVisible(false);
  };

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Privacy notice"
      className="fixed inset-x-0 bottom-0 z-50 border-t bg-background/95 p-4 shadow-lg backdrop-blur supports-[backdrop-filter]:bg-background/80"
    >
      <div className="mx-auto flex max-w-4xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-muted-foreground text-sm leading-relaxed">
          This site uses analytics to understand traffic and improve the
          experience.
          {b2bProvider
            ? ` We also use ${b2bProvider} to identify visiting companies for B2B outreach.`
            : null}
          &nbsp; See our&nbsp;
          <Link
            href="/privacy"
            className="text-foreground underline underline-offset-4"
          >
            privacy policy
          </Link>
          &nbsp; for details.
        </p>
        <button
          type="button"
          onClick={dismiss}
          className="shrink-0 rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground text-sm transition-colors hover:bg-primary/90"
        >
          Got it
        </button>
      </div>
    </div>
  );
};

export default AnalyticsPrivacyNotice;
