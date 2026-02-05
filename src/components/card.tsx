import { ComponentPropsWithoutRef } from "react";

import grainImage from "@/assets/images/grain.jpg";
import { cn } from "@/lib/utils";

const Card = ({ children, className, ...other }: ComponentPropsWithoutRef<"div">) => {
  return (
    <div
      className={cn(
        "relative z-0 overflow-hidden rounded-3xl bg-gray-800 after:pointer-events-none after:absolute after:inset-0 after:z-10 after:rounded-3xl after:outline after:outline-white/20 after:-outline-offset-2 after:content-['']",
        className,
      )}
      {...other}
    >
      <div className="absolute inset-0 -z-10 opacity-5" style={{ backgroundImage: `url(${grainImage.src})` }} />
      {children}
    </div>
  );
};

export default Card;
