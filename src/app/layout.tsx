import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/assets/css/globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Footer from "@/components/global/footer";
import Navbar from "@/components/global/navbar";
import ThemeProvider from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { SITE_URL } from "@/lib/constants";
import {
  PERSON_SCHEMA_ID,
  safeJsonLdStringify,
  toAbsoluteUrl,
  WEBSITE_SCHEMA_ID,
} from "@/lib/json-ld";
import { cn } from "@/lib/utils";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const rootJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": PERSON_SCHEMA_ID,
      name: "Mushood Hanif",
      url: SITE_URL,
      image: toAbsoluteUrl("/og-image.png"),
      jobTitle: "Founder and Builder",
      description:
        "Founder and Builder specializing in scalable SaaS platforms, AI-powered automation systems, Next.js, Node.js, and high-performance product engineering.",
      knowsAbout: [
        "SaaS Architecture",
        "AI Automation",
        "Next.js",
        "Node.js",
        "TypeScript",
      ],
    },
    {
      "@type": "WebSite",
      "@id": WEBSITE_SCHEMA_ID,
      url: SITE_URL,
      name: "Mushood Hanif",
      description:
        "Portfolio of Mushood Hanif focused on scalable SaaS and AI-powered systems.",
      inLanguage: "en-US",
      publisher: { "@id": PERSON_SCHEMA_ID },
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Mushood Hanif | Founder and Builder",
    template: "%s | Mushood Hanif",
  },
  description:
    "Founder and Builder specializing in scalable SaaS platforms, AI-powered automation systems, Next.js, Node.js, and high-performance product engineering.",
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
    other: {
      "msvalidate.01": "A1C10078467FC563779FE013C977698A",
    },
  },
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Founder and Builder | SaaS & AI Systems Architect",
    description:
      "Building scalable SaaS platforms, AI automation systems, and high-performance web applications using Next.js, Node.js, and modern cloud infrastructure.",
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
    title: "Founder and Builder | SaaS & AI Architect",
    description:
      "Scalable SaaS, AI automation, and high-performance product engineering with modern TypeScript ecosystems.",
    images: ["/og-image.png"],
  },
  keywords: [
    "Senior Full-Stack Software Engineer",
    "Founder",
    "Builder",
    "SaaS Architect",
    "AI Automation Engineer",
    "Next.js Developer",
    "React Developer",
    "TypeScript Engineer",
    "Node.js Backend Developer",
    "Multi-Tenant SaaS Development",
    "AI Integration Developer",
    "n8n Expert",
    "Product Engineer",
    "Scalable Web Applications",
    "Software Architect Pakistan",
    "Remote SaaS Engineer",
  ],
  publisher: "Mushood Hanif",
  category: "Technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
          <Navbar />
          <Toaster richColors duration={1500} />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
      {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ? (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
      ) : null}
    </html>
  );
}
