import type * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = ({ className, type, ...props }: InputProps) => {
  return (
    <input
      className={cn(
        "flex h-11 w-full rounded-xl border border-input bg-background/60 px-4 py-2 text-foreground text-sm ring-offset-background transition-all file:border-0 file:bg-transparent file:font-medium file:text-sm placeholder:text-muted-foreground/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      type={type}
      {...props}
    />
  );
};
Input.displayName = "Input";

export { Input };
