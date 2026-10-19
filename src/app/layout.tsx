import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import Analytics from "@/components/analytics";
import JsonLd from "@/components/json-ld";
import Providers from "@/components/providers";
import { personSchema, websiteSchema } from "@/lib/schema";
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE,
  DEFAULT_TITLE,
  SITE_NAME,
  SITE_URL,
} from "@/lib/seo";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

export const ensureStatic = "navigation";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: DEFAULT_TITLE, template: "%s" },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: "Mushood Hanif", url: SITE_URL }],
  creator: "Mushood Hanif",
  publisher: "Mushood Hanif",
  category: "technology",
  keywords: [
    "Mushood Hanif",
    "AI Engineer",
    "AI Systems Architect",
    "Haga Labs",
    "Afiniti",
    "LangGraph",
    "LLM",
    "MLOps",
    "PyTorch",
    "RAG",
  ],
  icons: {
    icon: [{ url: "/logo-dark.svg", type: "image/svg+xml" }],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: DEFAULT_TITLE }],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@mushoodhanif",
    site: "@mushoodhanif",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark light",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4efe3" },
    { media: "(prefers-color-scheme: dark)", color: "#26211f" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={`${inter.variable} ${fraunces.variable}`} lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground antialiased selection:bg-primary/20 selection:text-primary">
        <JsonLd data={[personSchema, websiteSchema(DEFAULT_DESCRIPTION)]} />
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  );
}
