import Image from "next/image";

import Card from "@/components/card";
import SectionHeader from "@/components/section-header";

interface TestimonialsSectionProps {
  testimonials: TestimonialProps[];
}

const TestimonialsSection = ({ testimonials }: TestimonialsSectionProps) => {
  return (
    <div className="py-16 lg:py-24">
      <div className="container">
        <SectionHeader
          eyebrow="Happy Clients"
          title="What Clients Say About Me"
          description="Don't just take my word for it. See what my clients have to say about my work."
        />
        <div className="-my-4 mt-12 flex overflow-x-clip py-4 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] lg:mt-20">
          <div className="flex flex-none animate-move-left gap-8 [animation-duration:60s] hover:[animation-play-state:paused]">
            {testimonials.map((testimonial, idx) => (
              <Card key={idx} className="hover:-rotate-3 max-w-xs p-6 transition duration-300 md:max-w-md md:p-8">
                <div className="flex items-center gap-4">
                  <div className="inline-flex size-14 flex-shrink-0 items-center justify-center rounded-full bg-gray-700">
                    <Image
                      width={50}
                      height={50}
                      src={`${testimonial.image}`}
                      alt={testimonial.client_name}
                      className="aspect-square max-h-full rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-semibold">{testimonial.client_name}</div>
                    <div className="text-sm text-white/40">
                      {testimonial.designation}&nbsp;@{testimonial.company}
                    </div>
                  </div>
                </div>
                <p className="mt-4 text-sm md:mt-6 md:text-base">{testimonial.content}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;
