import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/contact-form";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Contact — Fractional CTO & AI Systems Engagements",
  description:
    "Work with a fractional CTO on RAG systems, SaaS architecture, n8n automation, and production AI — for founders and product leaders with measurable outcomes in mind.",
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
          I work best with founders, business owners, and product leaders
          tackling production AI, platform rewrites, workflow automation, or
          fractional CTO advisory. Describe the business problem — not the stack
          you&apos;ve already picked — and I&apos;ll get back to you as soon as
          I can.
        </p>
      </div>

      <ContactForm />
    </div>
  );
}
