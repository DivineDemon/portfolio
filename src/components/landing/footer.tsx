import { useEffect, useState } from "react";
import LogoDark from "@/assets/img/logo-dark.svg";
import LogoLight from "@/assets/img/logo-light.svg";
import MaxWidthWrapper from "../max-width-wrapper";

const Footer = () => {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === "undefined") return false;
    return document.documentElement.classList.contains("dark");
  });

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
        <img alt="Logo" className="size-8.5" src={isDark ? LogoDark : LogoLight} />
        <span className="flex-1 text-right text-primary text-xs">
          &copy; {new Date().getFullYear()} Mushood Hanif. All rights reserved.
        </span>
      </MaxWidthWrapper>
    </footer>
  );
};

export default Footer;
