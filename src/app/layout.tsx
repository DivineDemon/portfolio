import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/assets/css/globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Contact from "@/components/global/contact";
import Footer from "@/components/global/footer";
import Navbar from "@/components/global/navbar";
import ThemeProvider from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { SITE_URL } from "@/lib/constants";
import { cn } from "@/lib/utils";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "Mushood Hanif | Senior Full-Stack Software Engineer & SaaS Architect",
    template: "%s | Mushood Hanif",
  },
  description:
    "Senior Full-Stack Software Engineer and SaaS Architect specializing in scalable SaaS platforms, AI-powered automation systems, Next.js, Node.js, and high-performance product engineering.",
  abstract:
    "SaaS Architect and AI Automation Engineer building scalable, high-performance platforms with modern TypeScript ecosystems.",
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
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Senior Full-Stack Software Engineer | SaaS & AI Systems Architect",
    description:
      "Building scalable SaaS platforms, AI automation systems, and high-performance web applications using Next.js, Node.js, and modern cloud infrastructure.",
    url: SITE_URL,
    siteName: "Mushood Hanif",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Mushood Hanif - Senior Software Engineer & SaaS Architect",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Senior Full-Stack Software Engineer | SaaS & AI Architect",
    description:
      "Scalable SaaS, AI automation, and high-performance product engineering with modern TypeScript ecosystems.",
    images: ["/og-image.png"],
  },
  keywords: [
    "Senior Full-Stack Software Engineer",
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
          <Contact />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
