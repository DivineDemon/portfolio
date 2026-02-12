import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

interface MarqueeProps extends ComponentPropsWithoutRef<"div"> {
  /**
   * Optional CSS class name to apply custom styles
   */
  className?: string;
  /**
   * Whether to reverse the animation direction
   * @default false
   */
  reverse?: boolean;
  /**
   * Whether to pause the animation on hover
   * @default false
   */
  pauseOnHover?: boolean;
  /**
   * Content to be displayed in the marquee
   */
  children: React.ReactNode;
  /**
   * Whether to animate vertically instead of horizontally
   * @default false
   */
  vertical?: boolean;
  /**
   * Number of times to repeat the content
   * @default 2
   */
  repeat?: number;
}

export function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 2,
  ...props
}: MarqueeProps) {
  return (
    <div
      {...props}
      className={cn(
        "group flex gap-(--gap) overflow-hidden p-2 [--duration:40s] [--gap:1rem]",
        {
          "flex-row": !vertical,
          "flex-col": vertical,
        },
        className,
      )}
    >
      {Array.from({ length: repeat }, (_, i) => `marquee-slot-${i}`).map(
        (slotKey) => (
          <div
            key={slotKey}
            className={cn("flex shrink-0 justify-around gap-(--gap)", {
              "animate-marquee motion-reduce:animate-none flex-row": !vertical,
              "animate-marquee-vertical motion-reduce:animate-none flex-col":
                vertical,
              "group-hover:paused": pauseOnHover,
              "direction-[reverse]": reverse,
            })}
          >
            {children}
          </div>
        ),
      )}
    </div>
  );
}
