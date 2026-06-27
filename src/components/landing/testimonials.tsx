import Image from "next/image";
import { FeaturedTestimonialCard } from "@/components/landing/testimonial-cards";
import MaxWidthWrapper from "@/components/ui/max-width-wrapper";
import type { clients } from "@/generated/prisma/client";
import { filterPublicClients } from "@/lib/clients";
import { getClients } from "@/lib/cms/get-clients";
import { cn } from "@/lib/utils";
import { Marquee } from "../ui/marquee";

function TestimonialMarqueeCard({ client }: { client: clients }) {
  const initial = client.clientName.trim().slice(0, 1).toUpperCase();

  return (
    <article
      className={cn(
        "flex min-w-[320px] max-w-[360px] shrink-0 flex-col rounded-xl border border-border bg-card p-5 shadow-sm",
        "transition-shadow duration-200 hover:shadow-md",
      )}
    >
      <div className="mb-4 flex items-center gap-3 border-b border-border/80 pb-4">
        {client.image ? (
          <Image
            alt="dp"
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
        <div className="min-w-0 flex-1">
          <p className="truncate font-mono text-sm font-medium text-foreground">
            {client.clientName}
          </p>
          <p className="truncate font-mono text-xs text-muted-foreground">
            {client.designation}
            {client.company && ` · ${client.company}`}
          </p>
        </div>
      </div>
      <p
        className="line-clamp-3 font-mono text-sm leading-relaxed text-foreground"
        title={client.content}
      >
        {client.content}
      </p>
    </article>
  );
}

const Testimonials = async () => {
  const clients = filterPublicClients(await getClients());
  const featured = clients.filter((client) => client.featured).slice(0, 3);
  const featuredIds = new Set(featured.map((client) => client.id));
  const marqueeClients = clients.filter(
    (client) => !featuredIds.has(client.id),
  );

  return (
    <MaxWidthWrapper parentBorder="border-b">
      <h2 className="w-full border-b p-5 text-left font-mono text-2xl font-semibold tracking-tight">
        Testimonials
      </h2>
      <div
        id="testimonials"
        className="relative flex w-full flex-col items-center justify-center overflow-hidden p-5"
      >
        {featured.length > 0 && (
          <div className="mb-6 grid w-full max-w-5xl gap-4 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((client) => (
              <FeaturedTestimonialCard key={client.id} client={client} />
            ))}
          </div>
        )}

        {marqueeClients.length > 0 && (
          <>
            <Marquee pauseOnHover>
              {marqueeClients.map((client) => (
                <TestimonialMarqueeCard key={client.id} client={client} />
              ))}
            </Marquee>
            <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-linear-to-r" />
            <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-linear-to-l" />
          </>
        )}
      </div>
    </MaxWidthWrapper>
  );
};

export default Testimonials;
