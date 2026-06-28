import { Grip } from "lucide-react";
import TrackedLink from "@/components/analytics/tracked-link";
import MaxWidthWrapper from "@/components/ui/max-width-wrapper";
import { ANALYTICS_EVENTS } from "@/lib/analytics/track";
import { getHeroCopy } from "@/lib/cms/site-copy";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";
import Dither from "../ui/dither";

const Hero = async () => {
  const { headline, badgeParts } = getHeroCopy();

  return (
    <MaxWidthWrapper parentBorder="border-b">
      <div className="w-full relative min-h-[40vh]">
        <div className="absolute inset-0">
          <Dither
            colorNum={4}
            waveSpeed={0.05}
            waveFrequency={3}
            waveAmplitude={0.3}
            disableAnimation={false}
            waveColor={[0.5, 0.5, 0.5]}
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-full md:max-w-2/3 mx-auto flex flex-col items-center justify-center gap-5 text-center pointer-events-auto px-4">
            <p className="w-fit px-5 py-1.5 rounded-full bg-background/10 backdrop-blur-md text-sm font-medium flex items-center justify-center gap-2 border">
              {badgeParts.map((part, index) => (
                <span key={part} className="flex items-center gap-2">
                  {index > 0 ? <Grip className="size-3.5" /> : null}
                  {part}
                </span>
              ))}
            </p>
            <h1 className="text-2xl md:text-4xl font-bold tracking-tight">
              {headline}
            </h1>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <TrackedLink
                href="#contact"
                eventName={ANALYTICS_EVENTS.CTA_CLICK}
                eventParams={{
                  cta_label: "Work with me",
                  cta_location: "hero",
                }}
                className={cn(buttonVariants({ variant: "default" }))}
              >
                Work with me
              </TrackedLink>
              <TrackedLink
                href="#projects"
                eventName={ANALYTICS_EVENTS.CTA_CLICK}
                eventParams={{
                  cta_label: "See how I've done it",
                  cta_location: "hero",
                }}
                className={cn(buttonVariants({ variant: "secondary" }))}
              >
                See how I&apos;ve done it
              </TrackedLink>
            </div>
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default Hero;
