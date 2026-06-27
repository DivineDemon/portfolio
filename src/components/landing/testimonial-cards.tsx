import Image from "next/image";
import Link from "next/link";
import type { clients } from "@/generated/prisma/client";
import { cn } from "@/lib/utils";

export function InlineTestimonial({
  client,
  className,
}: {
  client: clients;
  className?: string;
}) {
  if (!client.content?.trim()) return null;

  const initial = client.clientName.trim().slice(0, 1).toUpperCase();
  const avatar = client.image?.trim();
  const logo = client.logo?.trim();

  return (
    <figure
      className={cn(
        "rounded-xl border border-border/80 bg-muted/20 p-4",
        className,
      )}
    >
      <blockquote className="font-mono text-sm leading-relaxed text-foreground">
        {client.content}
      </blockquote>
      <figcaption className="mt-4 flex items-center gap-3 border-t border-border/60 pt-4">
        {avatar ? (
          <Image
            alt={client.clientName}
            width={36}
            height={36}
            src={avatar}
            className="size-9 shrink-0 rounded-full border border-border object-cover"
          />
        ) : (
          <div
            className="flex size-9 shrink-0 items-center justify-center rounded-full border border-border bg-muted font-mono text-xs font-medium text-muted-foreground"
            aria-hidden
          >
            {initial}
          </div>
        )}
        <div className="min-w-0 flex-1">
          <p className="truncate font-mono text-sm font-medium">
            {client.clientName}
          </p>
          <p className="truncate font-mono text-xs text-muted-foreground">
            {client.designation}
            {client.company && ` · ${client.company}`}
          </p>
        </div>
        {logo && (
          <Image
            alt={`${client.company} logo`}
            width={32}
            height={32}
            src={logo}
            className="size-8 shrink-0 rounded object-contain"
          />
        )}
        {client.companyUrl?.trim() && (
          <Link
            href={client.companyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 font-mono text-xs text-primary hover:underline"
          >
            Verify
          </Link>
        )}
      </figcaption>
    </figure>
  );
}

export function FeaturedTestimonialCard({ client }: { client: clients }) {
  if (!client.content?.trim()) return null;

  const initial = client.clientName.trim().slice(0, 1).toUpperCase();
  const avatar = client.image?.trim();
  const logo = client.logo?.trim();

  return (
    <article className="flex flex-col rounded-xl border border-border bg-card p-6 shadow-sm">
      <blockquote className="font-mono text-base leading-relaxed text-foreground">
        {client.content}
      </blockquote>
      {client.feedback?.trim() && (
        <p className="mt-4 font-mono text-sm text-muted-foreground">
          {client.feedback}
        </p>
      )}
      <footer className="mt-5 flex items-center gap-3 border-t border-border/80 pt-5">
        {avatar ? (
          <Image
            alt={client.clientName}
            width={44}
            height={44}
            src={avatar}
            className="size-11 shrink-0 rounded-full border border-border object-cover"
          />
        ) : (
          <div
            className="flex size-11 shrink-0 items-center justify-center rounded-full border border-border bg-muted font-mono text-sm font-medium text-muted-foreground"
            aria-hidden
          >
            {initial}
          </div>
        )}
        <div className="min-w-0 flex-1">
          <p className="font-mono text-sm font-semibold">{client.clientName}</p>
          <p className="font-mono text-xs text-muted-foreground">
            {client.designation}
            {client.company && ` · ${client.company}`}
          </p>
        </div>
        {logo && (
          <Image
            alt={`${client.company} logo`}
            width={40}
            height={40}
            src={logo}
            className="size-10 shrink-0 rounded object-contain"
          />
        )}
        {client.companyUrl?.trim() && (
          <Link
            href={client.companyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 font-mono text-xs text-primary hover:underline"
          >
            Verify
          </Link>
        )}
      </footer>
    </article>
  );
}
