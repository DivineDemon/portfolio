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

const b2bProvider = process.env.NEXT_PUBLIC_B2B_VISITOR_PROVIDER?.trim();

export default function PrivacyPage() {
  return (
    <MaxWidthWrapper parentBorder="border-none" showPlusIcons={false}>
      <article className="prose prose-invert mx-auto max-w-3xl px-5 py-16">
        <h1>Privacy Policy</h1>
        <p className="lead text-muted-foreground">
          Last updated: June 2026. This policy explains what data this site
          collects and why.
        </p>

        <h2>Analytics</h2>
        <p>
          This site uses Google Analytics 4 (GA4) to measure traffic, page
          views, and conversion events such as contact form submissions and
          booking link clicks. GA4 may set cookies and collect anonymized usage
          data including pages visited, referral source, device type, and
          general location (country/city level).
        </p>

        <h2>Session recordings</h2>
        <p>
          When enabled, Microsoft Clarity records anonymized session replays and
          heatmaps to help improve page layout and usability. Clarity masks
          sensitive form input by default.
        </p>

        {b2bProvider ? (
          <>
            <h2>Company identification</h2>
            <p>
              This site uses {b2bProvider} to identify the company associated
              with a visitor&apos;s IP address. This helps prioritize outreach
              to organizations that view case studies or service pages.
              Identified company data is used only for legitimate business
              development and is not sold to third parties.
            </p>
          </>
        ) : null}

        <h2>Contact form and lead magnets</h2>
        <p>
          When you submit the contact form or download a lead magnet, the
          information you provide (name, email, and any message) is stored to
          respond to your inquiry. This data is not used for advertising
          profiles.
        </p>

        <h2>Your choices</h2>
        <ul>
          <li>
            Use browser privacy settings or extensions to block analytics
            cookies.
          </li>
          <li>
            Opt out of Google Analytics via the&nbsp;
            <a
              href="https://tools.google.com/dlpage/gaoptout"
              rel="noopener noreferrer"
              target="_blank"
            >
              Google Analytics Opt-out Browser Add-on
            </a>
            .
          </li>
          <li>
            Contact&nbsp;
            <a href="mailto:hello@mushoodhanif.com">hello@mushoodhanif.com</a>
            &nbsp; to request deletion of data you have submitted through forms.
          </li>
        </ul>

        <h2>Third-party services</h2>
        <p>
          This site is hosted on Vercel and may use Vercel Analytics for
          aggregate performance metrics. Third-party booking links (e.g.
          Calendly) are governed by their own privacy policies once you leave
          this site.
        </p>
      </article>
    </MaxWidthWrapper>
  );
}
