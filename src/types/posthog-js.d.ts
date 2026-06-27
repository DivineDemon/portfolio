declare module "posthog-js" {
  type PostHogClient = {
    init: (token: string, options?: Record<string, unknown>) => void;
    capture: (event: string, properties?: Record<string, unknown>) => void;
  };

  const posthog: PostHogClient;
  export default posthog;
}
