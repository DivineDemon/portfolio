import type * as React from "react";
import { cn } from "@/lib/utils";

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

const Label = ({ className, ...props }: LabelProps) => {
  return (
    // biome-ignore lint/a11y/noLabelWithoutControl: MDX list items
    <label
      className={cn(
        "font-semibold text-muted-foreground text-xs uppercase tracking-wider peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        className,
      )}
      {...props}
    />
  );
};
Label.displayName = "Label";

export { Label };
