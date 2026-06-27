const DEFAULT_API_HOST = "https://us.i.posthog.com";

export function getPostHogProjectToken(): string | undefined {
  return process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN?.trim() || undefined;
}

export function getPostHogApiHost(): string {
  return (
    process.env.NEXT_PUBLIC_POSTHOG_HOST?.trim().replace(/\/$/, "") ||
    DEFAULT_API_HOST
  );
}

export function getPostHogUiHost(): string {
  return getPostHogApiHost().replace(".i.posthog.com", ".posthog.com");
}

export function getPostHogAssetsHost(): string {
  const apiHost = getPostHogApiHost();

  if (apiHost.includes("eu.i.posthog.com")) {
    return "https://eu-assets.i.posthog.com";
  }

  return "https://us-assets.i.posthog.com";
}

export function isPostHogEnabled(): boolean {
  return Boolean(getPostHogProjectToken());
}
