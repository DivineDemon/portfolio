export function deferUntilIdle(callback: () => void) {
  if (typeof window === "undefined") {
    return;
  }

  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(callback, { timeout: 4000 });
    return;
  }

  setTimeout(callback, 2000);
}
