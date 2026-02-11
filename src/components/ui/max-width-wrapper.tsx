import Plus from "@/assets/icons/plus";
import { cn } from "@/lib/utils";

interface MaxWidthWrapperProps {
  className?: string;
  showPlusIcons?: boolean;
  children: React.ReactNode;
  parentBorder?: "border-y" | "border-t" | "border-b" | "border-none";
}

const MaxWidthWrapper = ({
  children,
  className,
  showPlusIcons = true,
  parentBorder = "border-y",
}: MaxWidthWrapperProps) => {
  return (
    <div className={cn("w-full px-5 lg:px-0", parentBorder, className)}>
      <div className="w-full max-w-3xl mx-auto border-x relative">
        {showPlusIcons &&
          (parentBorder === "border-y" || parentBorder === "border-t") && (
            <>
              <Plus
                className="size-8 absolute -top-[16.5px] -left-[16.5px] z-40 text-muted-foreground"
                strokeWidth={1}
              />
              <Plus
                className="size-8 absolute -top-[16.5px] -right-[16.5px] z-40 text-muted-foreground"
                strokeWidth={1}
              />
            </>
          )}
        {children}
        {showPlusIcons &&
          (parentBorder === "border-y" || parentBorder === "border-b") && (
            <>
              <Plus
                className="size-8 absolute -bottom-[16.5px] -right-[16.5px] z-40 text-muted-foreground"
                strokeWidth={1}
              />
              <Plus
                className="size-8 absolute -bottom-[16.5px] -left-[16.5px] z-40 text-muted-foreground"
                strokeWidth={1}
              />
            </>
          )}
      </div>
    </div>
  );
};

export default MaxWidthWrapper;
