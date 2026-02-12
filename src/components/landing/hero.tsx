import { Grip } from "lucide-react";
import Link from "next/link";
import MaxWidthWrapper from "@/components/ui/max-width-wrapper";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";
import Dither from "../ui/dither";

const Hero = () => {
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
          <div className="w-full max-w-2/3 mx-auto flex flex-col items-center justify-center gap-5 text-center pointer-events-auto">
            <p className="px-5 py-1.5 rounded-full bg-background/10 backdrop-blur-md text-sm font-medium flex items-center justify-center gap-2 border">
              Founder
              <Grip className="size-3.5" />
              Builder
            </p>
            <h1 className="text-2xl md:text-4xl font-bold tracking-tight">
              I Build Scalable SaaS & AI Systems That Drive Measurable Business
              Growth.
            </h1>
            <Link
              href="#contact"
              className={cn(
                buttonVariants({
                  variant: "default",
                }),
              )}
            >
              Get in touch
            </Link>
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default Hero;
