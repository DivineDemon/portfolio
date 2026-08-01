import { useEffect, useState } from "react";
import LogoDark from "@/assets/img/logo-dark.svg?url";
import LogoLight from "@/assets/img/logo-light.svg?url";
import { getImageSrc } from "@/lib/utils";
import MaxWidthWrapper from "../max-width-wrapper";

const Footer = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const updateTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };

    updateTheme();

    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <footer className="h-16 w-full border-border/50 border-t">
      <MaxWidthWrapper className="flex h-full w-full items-center justify-center">
        <img
          alt="Logo"
          className="size-8.5"
          src={getImageSrc(isDark ? LogoDark : LogoLight)}
          suppressHydrationWarning
        />
        <span className="flex-1 text-right text-primary text-xs">
          &copy; {new Date().getFullYear()} Mushood Hanif. All rights reserved.
        </span>
      </MaxWidthWrapper>
    </footer>
  );
};

export default Footer;
