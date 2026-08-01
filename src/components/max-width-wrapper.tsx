import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MaxWidthWrapperProps {
  id?: string;
  className?: string;
  children: ReactNode;
}

const MaxWidthWrapper = ({ id, children, className }: MaxWidthWrapperProps) => {
  return (
    <div className={cn("mx-auto max-w-3xl", className)} id={id}>
      {children}
    </div>
  );
};

export default MaxWidthWrapper;
