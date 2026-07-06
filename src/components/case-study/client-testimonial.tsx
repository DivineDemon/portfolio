import Image from "next/image";
import Link from "next/link";
import type { CaseStudyClient } from "@/lib/types/case-study";

export function ClientTestimonial({ client }: { client: CaseStudyClient }) {
  if (!client.content.trim() && !client.feedback?.trim()) {
    return null;
  }

  return (
    <section className="flex flex-col gap-4 border border-border bg-muted/20 p-5">
      {client.feedback?.trim() ? (
        <p className="text-sm leading-7 text-muted-foreground">
          &ldquo;{client.feedback.trim()}&rdquo;
        </p>
      ) : null}
      {client.content.trim() ? (
        <p className="text-sm leading-7 text-muted-foreground">
          {client.content.trim()}
        </p>
      ) : null}
      <div className="flex items-center gap-3">
        {client.image ? (
          <Image
            src={client.image}
            alt={client.clientName}
            width={40}
            height={40}
            className="size-10 rounded-full object-cover"
          />
        ) : null}
        <div className="min-w-0">
          <p className="text-sm font-semibold text-foreground">
            {client.clientName}
          </p>
          <p className="text-xs text-muted-foreground">
            {client.designation}
            {client.company && !client.companyUrl ? ` · ${client.company}` : ""}
          </p>
          {client.companyUrl && client.company ? (
            <Link
              href={client.companyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-primary underline underline-offset-4"
            >
              {client.company}
            </Link>
          ) : null}
        </div>
        {client.logo ? (
          <Image
            src={client.logo}
            alt={`${client.company} logo`}
            width={48}
            height={24}
            className="ml-auto h-6 w-auto object-contain"
          />
        ) : null}
      </div>
    </section>
  );
}
