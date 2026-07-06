"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "analytics-privacy-notice-dismissed";

const AnalyticsPrivacyNotice = () => {
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
        <p className="text-sm leading-relaxed text-muted-foreground">
          This site uses analytics to understand traffic and improve the
          experience.
        </p>
        <button
          type="button"
          onClick={dismiss}
          className="shrink-0 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Got it
        </button>
      </div>
    </div>
  );
};

export default AnalyticsPrivacyNotice;
