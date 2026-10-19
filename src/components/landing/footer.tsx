"use client";

import { useEffect, useState } from "react";
import LogoDark from "@/assets/img/logo-dark.svg";
import LogoLight from "@/assets/img/logo-light.svg";
import MaxWidthWrapper from "../max-width-wrapper";

const Footer = () => {
  const [year, setYear] = useState<number | null>(null);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    setYear(new Date().getFullYear());

    const root = document.documentElement;
    const updateTheme = () => setIsDark(root.classList.contains("dark"));

    updateTheme();

    const observer = new MutationObserver(updateTheme);
    observer.observe(root, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <footer className="h-16 w-full border-border/50 border-t">
      <MaxWidthWrapper className="flex h-full w-full items-center justify-center">
        <img
          alt="Mushood Hanif logo"
          className="size-8.5"
          height={34}
          src={(isDark ? LogoDark : LogoLight).src}
          suppressHydrationWarning
          width={34}
        />
        <span className="flex-1 text-right text-primary text-xs" suppressHydrationWarning>
          &copy; {year ?? ""} Mushood Hanif. All rights reserved.
        </span>
      </MaxWidthWrapper>
    </footer>
  );
};

export default Footer;
