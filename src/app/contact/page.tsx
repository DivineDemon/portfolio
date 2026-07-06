import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/contact-form";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Contact",
  description:
    "Get in touch about a project, collaboration, or consulting engagement.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="flex w-full max-w-xl flex-col items-start justify-start gap-8">
      <div className="flex w-full flex-col items-center justify-center gap-2">
        <h1 className="w-full text-left font-heading text-3xl font-bold tracking-tight text-foreground">
          Contact
        </h1>
        <p className="w-full text-left text-sm text-muted-foreground">
          Tell me about the problem you&apos;re solving. I&apos;ll get back to
          you as soon as I can.
        </p>
      </div>

      <ContactForm />
    </div>
  );
}
