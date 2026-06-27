import {
  ArrowUpRight,
  Cookie,
  ExternalLink,
  type LucideIcon,
  Mail,
  ShieldOff,
} from "lucide-react";
import type { Metadata } from "next";
import MaxWidthWrapper from "@/components/ui/max-width-wrapper";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Mushood Hanif collects and uses analytics data on this portfolio site.",
  robots: {
    index: true,
    follow: true,
  },
};

const SECTIONS = [
  {
    id: "analytics",
    title: "Google Analytics",
    body: (
      <>
        This site uses Google Analytics 4 (GA4) to measure traffic, page views,
        and conversion events such as contact form submissions and booking link
        clicks. GA4 may set cookies and collect usage data including pages
        visited, referral source, device type, and general location at the
        country or city level.
      </>
    ),
  },
  {
    id: "posthog",
    title: "PostHog",
    body: (
      <>
        When enabled, PostHog records page views, custom conversion events, and
        optional session replays to help improve the site. PostHog may set
        cookies or use local storage to distinguish sessions. Data is used for
        analytics and product improvement only — not for advertising profiles.
      </>
    ),
  },
  {
    id: "clarity",
    title: "Microsoft Clarity",
    body: (
      <>
        When enabled, Microsoft Clarity records anonymized session replays and
        heatmaps to help improve page layout and usability. Clarity masks
        sensitive form input by default.
      </>
    ),
  },
  {
    id: "contact",
    title: "Contact form",
    body: (
      <>
        When you submit the contact form, the information you provide — name,
        email, and message — is stored so I can respond to your inquiry. This
        data is not used for advertising or sold to third parties.
      </>
    ),
  },
  {
    id: "hosting",
    title: "Hosting & performance",
    body: (
      <>
        This site is hosted on Vercel and uses Vercel Analytics and Speed
        Insights for aggregate performance metrics. Third-party booking links
        (for example, Calendly) are governed by their own privacy policies once
        you leave this site.
      </>
    ),
  },
] as const;

const CHOICES: {
  icon: LucideIcon;
  label: string;
  detail: string;
  href?: string;
  action?: string;
  external?: boolean;
}[] = [
  {
    icon: Cookie,
    label: "Block analytics cookies",
    detail:
      "Most browsers let you block third-party cookies or use privacy extensions to limit tracking.",
  },
  {
    icon: ShieldOff,
    label: "Opt out of Google Analytics",
    detail:
      "Google provides a browser add-on that prevents GA from collecting data on sites you visit.",
    href: "https://tools.google.com/dlpage/gaoptout",
    action: "Get the add-on",
    external: true,
  },
  {
    icon: Mail,
    label: "Request data deletion",
    detail:
      "If you submitted the contact form and want your message removed, reach out directly.",
    href: "mailto:hello@mushoodhanif.com",
    action: "hello@mushoodhanif.com",
  },
];

export default function PrivacyPage() {
  return (
    <MaxWidthWrapper parentBorder="border-none">
      <article className="w-full flex flex-col items-center justify-center font-mono text-sm">
        <header className="space-y-4 w-full p-5 border-b">
          <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
            Legal
          </p>
          <h1 className="font-mono text-3xl font-semibold tracking-tight md:text-4xl">
            Privacy Policy
          </h1>
          <p className="max-w-2xl font-mono text-sm leading-relaxed text-muted-foreground">
            A plain-language summary of what this site collects, why it collects
            it, and what you can do about it. Last updated June 2026. I use
            analytics to understand how visitors use this portfolio and to
            improve the experience. I do not sell your data. Form submissions
            are kept only to reply to you.
          </p>
        </header>

        {SECTIONS.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className="space-y-4 w-full p-5 border-b"
          >
            <h2 className="font-mono text-base font-semibold tracking-tight text-foreground">
              {section.title}
            </h2>
            <p className="font-mono text-sm leading-relaxed text-muted-foreground">
              {section.body}
            </p>
          </section>
        ))}

        <section id="choices" className="w-full border-b">
          <div className="space-y-2 p-5 border-b">
            <h2 className="font-mono text-base font-semibold tracking-tight text-foreground">
              Your choices
            </h2>
            <p className="font-mono text-sm leading-relaxed text-muted-foreground">
              You can limit or opt out of data collection at any time.
            </p>
          </div>

          {CHOICES.map((choice, index) => {
            const Icon = choice.icon;

            return (
              <article
                key={choice.label}
                className="flex flex-col p-5 border-b last:border-b-0"
              >
                <div className="flex w-full items-center gap-5">
                  <div className="flex size-[45px] shrink-0 items-center justify-center rounded-lg bg-muted p-2">
                    <Icon className="size-full text-foreground" />
                  </div>
                  <div className="flex flex-1 flex-col items-center justify-center">
                    <span className="w-full text-left font-mono text-xs tabular-nums text-muted-foreground">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-1.5 w-full text-left text-lg font-semibold tracking-tight">
                      {choice.label}
                    </h3>
                  </div>
                </div>

                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                  {choice.detail}
                </p>

                {choice.href && choice.action ? (
                  <a
                    href={choice.href}
                    target={choice.external ? "_blank" : undefined}
                    rel={choice.external ? "noopener noreferrer" : undefined}
                    className="mt-4 inline-flex w-fit items-center gap-1.5 font-mono text-sm text-blue-300 transition-colors hover:text-blue-200"
                  >
                    {choice.action}
                    {choice.external ? (
                      <ExternalLink className="size-3.5 shrink-0" aria-hidden />
                    ) : (
                      <ArrowUpRight className="size-3.5 shrink-0" aria-hidden />
                    )}
                  </a>
                ) : null}
              </article>
            );
          })}
        </section>

        <footer className="w-full p-5 border-t">
          <p className="font-mono text-sm text-muted-foreground">
            Questions about this policy?&nbsp;
            <a
              href="mailto:hello@mushoodhanif.com"
              className="text-blue-300 underline-offset-2 transition-colors hover:underline"
            >
              hello@mushoodhanif.com
            </a>
          </p>
        </footer>
      </article>
    </MaxWidthWrapper>
  );
}
