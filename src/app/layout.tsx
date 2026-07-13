import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";
import { Noto_Sans, Playfair_Display } from "next/font/google";
import "@/assets/css/globals.css";
import Analytics from "@/components/analytics/analytics";
import { GoogleAdsTag } from "@/components/analytics/google-ads-tag";
import GlobalLayout from "@/components/layout/global-layout";
import Providers from "@/components/providers/providers";
import { JsonLd } from "@/components/seo/json-ld";
import { getSiteJsonLd } from "@/lib/seo/get-site-json-ld";
import { rootMetadata } from "@/lib/seo/metadata";
import { cn } from "@/lib/utils";

const playfairDisplayHeading = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
});

const notoSans = Noto_Sans({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = rootMetadata;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteJsonLd = await getSiteJsonLd();
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const googleAdsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;

  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        "font-sans",
        notoSans.variable,
        playfairDisplayHeading.variable,
      )}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <JsonLd data={siteJsonLd} />
        <Analytics />
        <Providers>
          <GlobalLayout>{children}</GlobalLayout>
        </Providers>
      </body>
      {gaId ? <GoogleAnalytics gaId={gaId} /> : null}
      {googleAdsId ? <GoogleAdsTag adsId={googleAdsId} /> : null}
    </html>
  );
}
