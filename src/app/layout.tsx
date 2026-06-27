import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Suspense } from "react";
import "@/assets/css/globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import AnalyticsPrivacyNotice from "@/components/analytics/analytics-privacy-notice";
import B2BVisitorPixel from "@/components/analytics/b2b-visitor-pixel";
import MicrosoftClarity from "@/components/analytics/microsoft-clarity";
import Footer from "@/components/global/footer";
import NavbarShell from "@/components/global/navbar-shell";
import ThemeProvider from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { getSiteSettings } from "@/lib/cms/get-site-settings";
import { SITE_URL } from "@/lib/constants";
import { safeJsonLdStringify } from "@/lib/json-ld";
import { SITE_SEO_DEFAULTS } from "@/lib/seo/defaults";
import { getSiteJsonLd } from "@/lib/seo/get-site-json-ld";
import { cn } from "@/lib/utils";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const title =
    settings?.positioningTitle?.trim() ?? SITE_SEO_DEFAULTS.positioningTitle;
  const description =
    settings?.positioningDescription?.trim() ??
    SITE_SEO_DEFAULTS.positioningDescription;
  const openGraphTitle =
    settings?.positioningTitle?.trim() ?? SITE_SEO_DEFAULTS.openGraphTitle;
  const openGraphDescription =
    settings?.positioningDescription?.trim() ??
    SITE_SEO_DEFAULTS.openGraphDescription;

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: title,
      template: "%s | Mushood Hanif",
    },
    description,
    abstract:
      "Founder and Builder building scalable, high-performance platforms with modern TypeScript ecosystems.",
    alternates: {
      canonical: SITE_URL,
    },
    applicationName: "Mushood Hanif",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      ...(process.env.GOOGLE_SITE_VERIFICATION
        ? { google: process.env.GOOGLE_SITE_VERIFICATION }
        : {}),
      other: {
        "msvalidate.01": "A1C10078467FC563779FE013C977698A",
      },
    },
    icons: {
      icon: "/logo.svg",
    },
    openGraph: {
      title: openGraphTitle,
      description: openGraphDescription,
      url: SITE_URL,
      siteName: "Mushood Hanif",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "Mushood Hanif - Founder and Builder",
        },
      ],
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title:
        settings?.positioningTitle?.trim() ?? SITE_SEO_DEFAULTS.twitterTitle,
      description:
        settings?.positioningDescription?.trim() ??
        SITE_SEO_DEFAULTS.twitterDescription,
      images: ["/og-image.png"],
    },
    keywords: [
      "Fractional CTO",
      "hire fractional CTO",
      "AI Business Consultant",
      "AI automation consultant for hire",
      "SaaS Architect",
      "SaaS architecture consultant",
      "n8n automation expert",
      "AI Automation Engineer",
      "Next.js Developer",
      "TypeScript Engineer",
      "Multi-Tenant SaaS Development",
      "technical co-founder for hire",
      "Product Engineer",
      "Remote SaaS Engineer",
    ],
    publisher: "Mushood Hanif",
    category: "Technology",
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const rootJsonLd = await getSiteJsonLd();
  const b2bPixelEnabled =
    process.env.NEXT_PUBLIC_B2B_VISITOR_PIXEL_ENABLED === "true";
  const b2bScriptUrl = process.env.NEXT_PUBLIC_B2B_VISITOR_SCRIPT_URL?.trim();
  const b2bProvider = process.env.NEXT_PUBLIC_B2B_VISITOR_PROVIDER?.trim();
  const showAnalyticsPrivacyNotice =
    Boolean(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID) ||
    Boolean(process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID) ||
    (b2bPixelEnabled && b2bScriptUrl);

  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={cn(geistSans.variable, geistMono.variable, "antialiased")}
      >
        <script type="application/ld+json">
          {safeJsonLdStringify(rootJsonLd)}
        </script>
        <Analytics />
        <SpeedInsights />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
          disableTransitionOnChange
        >
          <NavbarShell />
          <Toaster richColors duration={1500} />
          <Suspense fallback={null}>
            {children}
            <Footer />
          </Suspense>
          {showAnalyticsPrivacyNotice ? (
            <AnalyticsPrivacyNotice b2bProvider={b2bProvider} />
          ) : null}
        </ThemeProvider>
      </body>
      {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ? (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
      ) : null}
      {process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID ? (
        <MicrosoftClarity
          projectId={process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID}
        />
      ) : null}
      {b2bPixelEnabled && b2bScriptUrl ? (
        <B2BVisitorPixel scriptUrl={b2bScriptUrl} provider={b2bProvider} />
      ) : null}
    </html>
  );
}
