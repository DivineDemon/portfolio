import Image from "next/image";
import MaxWidthWrapper from "@/components/ui/max-width-wrapper";
import type { testimonials } from "@/generated/prisma/client";
import { server } from "@/lib/elysia/server";
import { cn } from "@/lib/utils";
import { Marquee } from "../ui/marquee";

function TestimonialCard({ testimonial }: { testimonial: testimonials }) {
  const initial = testimonial.client_name.trim().slice(0, 1).toUpperCase();

  return (
    <article
      className={cn(
        "flex min-w-[320px] max-w-[360px] shrink-0 flex-col rounded-xl border border-border bg-card p-5 shadow-sm",
        "transition-shadow duration-200 hover:shadow-md",
      )}
    >
      <div className="mb-4 flex items-center gap-3 border-b border-border/80 pb-4">
        {testimonial.image ? (
          <Image
            alt="dp"
            width={40}
            height={40}
            src={testimonial.image}
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
            {testimonial.client_name}
          </p>
          <p className="truncate font-mono text-xs text-muted-foreground">
            {testimonial.designation}
            {testimonial.company && ` · ${testimonial.company}`}
          </p>
        </div>
      </div>
      <p
        className="font-mono text-sm leading-relaxed text-foreground line-clamp-3"
        title={testimonial.content}
      >
        {testimonial.content}
      </p>
    </article>
  );
}

const Testimonials = async () => {
  const testimonials = await server.testimonial.get();

  return (
    <MaxWidthWrapper parentBorder="border-b">
      <h2 className="text-2xl font-semibold tracking-tight p-5 text-left w-full border-b font-mono">
        Testimonials
      </h2>
      <div
        id="testimonials"
        className="relative flex w-full flex-col items-center justify-center overflow-hidden p-5"
      >
        <Marquee pauseOnHover>
          {testimonials.data?.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </Marquee>
        <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-linear-to-r" />
        <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-linear-to-l" />
      </div>
    </MaxWidthWrapper>
  );
};

export default Testimonials;
