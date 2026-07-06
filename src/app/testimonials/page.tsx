import type { Metadata } from "next";
import { TestimonialCard } from "@/components/ui/tweet-card";
import { getTestimonials } from "@/lib/data/testimonials";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Testimonials",
  description: "What clients and collaborators say about working together.",
  path: "/testimonials",
});

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials();

  return (
    <div className="flex w-full max-w-5xl flex-col items-start justify-start gap-5">
      <div className="flex w-full flex-col items-center justify-center gap-2">
        <h1 className="w-full text-left font-heading text-3xl font-bold tracking-tight text-foreground">
          Testimonials
        </h1>
        <p className="w-full text-left text-sm text-muted-foreground">
          What clients and collaborators say.
        </p>
      </div>
      {testimonials.length === 0 ? (
        <p className="text-sm text-muted-foreground">No testimonials yet.</p>
      ) : (
        <div className="grid w-full gap-4 sm:grid-cols-2">
          {testimonials.map((testimonial) => (
            <TestimonialCard
              key={testimonial.id}
              clientName={testimonial.clientName}
              designation={testimonial.designation}
              company={testimonial.company}
              content={testimonial.content}
              image={testimonial.image}
            />
          ))}
        </div>
      )}
    </div>
  );
}
