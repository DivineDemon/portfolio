import { forwardRef, type SVGProps } from "react";

interface PlusProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
  strokeWidth?: number | string;
}

const Plus = forwardRef<SVGSVGElement, PlusProps>(
  (
    { size = 24, className, strokeWidth = 1, color = "currentColor", ...props },
    ref,
  ) => {
    return (
      <svg
        ref={ref}
        role="img"
        fill="none"
        width={size}
        height={size}
        stroke={color}
        aria-label="Plus"
        viewBox="0 0 24 24"
        strokeLinecap="round"
        className={className}
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path d="M12 5v14M5 12h14" vectorEffect="non-scaling-stroke" />
      </svg>
    );
  },
);

Plus.displayName = "Plus";

export default Plus;
