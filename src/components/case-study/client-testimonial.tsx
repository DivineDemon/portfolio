import Image from "next/image";
import type { Client } from "@/components/case-study/types";

export function ClientTestimonial({ client }: { client: Client }) {
  if (!client.content?.trim()) return null;

  const initial = client.clientName.trim().slice(0, 1).toUpperCase();

  return (
    <section className="border-b bg-muted/20 p-5">
      <blockquote className="border-l-2 border-primary/40 pl-4 font-mono text-sm leading-relaxed text-foreground">
        {client.content}
      </blockquote>
      {client.feedback?.trim() && (
        <p className="mt-4 font-mono text-sm leading-relaxed text-muted-foreground">
          {client.feedback}
        </p>
      )}
      <footer className="mt-4 flex items-center gap-3 border-t border-border/80 pt-4">
        {client.image ? (
          <Image
            alt={client.clientName}
            width={40}
            height={40}
            src={client.image}
            className="size-10 shrink-0 rounded-full border border-border object-cover"
          />
        ) : (
          <div
            className="flex size-10 shrink-0 items-center justify-center rounded-full border border-border bg-muted font-mono text-sm font-medium text-muted-foreground"
            aria-hidden
          >
            {initial}
          </div>
        )}
        <div className="min-w-0">
          <p className="font-mono text-sm font-medium text-foreground">
            {client.clientName}
          </p>
          <p className="font-mono text-xs text-muted-foreground">
            {client.designation}
            {client.company && ` · ${client.company}`}
          </p>
        </div>
      </footer>
    </section>
  );
}
