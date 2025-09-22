import { PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

const HeroOrbit = ({
  children,
  size,
  rotation,
  spinDuration,
  orbitDuration,
  shouldSpin = false,
  shouldOrbit = false,
}: PropsWithChildren<{
  size: number;
  rotation: number;
  spinDuration?: string;
  orbitDuration?: string;
  shouldSpin?: boolean;
  shouldOrbit?: boolean;
}>) => {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2">
      <div
        className={cn(shouldOrbit && "animate-spin")}
        style={{ animationDuration: orbitDuration }}
        aria-hidden="true"
      >
        <div
          style={{
            height: `${size}px`,
            width: `${size}px`,
            transform: `rotate(${rotation}deg)`,
          }}
          className="flex items-start justify-start"
        >
          <div
            className={cn(shouldSpin && "animate-spin")}
            style={{ animationDuration: spinDuration }}
            aria-hidden="true"
          >
            <div className="inline-flex" style={{ transform: `rotate(${-rotation}deg)` }}>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroOrbit;
