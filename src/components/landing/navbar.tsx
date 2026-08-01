import { useEffect, useState } from "react";
import LogoDark from "@/assets/img/logo-dark.svg?url";
import LogoLight from "@/assets/img/logo-light.svg?url";
import { NAV_ITEMS } from "@/lib/constants";
import { cn, getImageSrc } from "@/lib/utils";
import { AnimatedThemeToggler } from "../ui/animated-theme-toggler";
import { buttonVariants } from "../ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

const Navbar = () => {
  const [pathname, setPathname] = useState("/");
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setPathname(window.location.pathname);
    }

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

  const isHome = pathname === "/" || pathname === "";
  const navItems = !isHome ? NAV_ITEMS.filter((item) => item.link.startsWith("/")) : NAV_ITEMS;

  return (
    <nav className="fixed top-0 z-50 w-full p-2 sm:p-2.5">
      <div className="mx-auto flex max-w-3xl items-center justify-between rounded-xl border bg-background/70 px-2 py-2 shadow-xs backdrop-blur-md sm:px-3">
        <a className="flex shrink-0 items-center justify-center gap-2 sm:gap-3" href="/">
          <img
            alt="Logo"
            className="size-7 sm:size-8"
            src={getImageSrc(isDark ? LogoDark : LogoLight)}
            suppressHydrationWarning
          />
          <h1 className="xs:block hidden font-bold font-heading text-xs leading-tight sm:text-sm">
            Mushood
            <br />
            <span className="text-primary">Hanif</span>
          </h1>
        </a>

        <div className="flex items-center justify-center gap-1 sm:gap-2">
          <TooltipProvider delayDuration={100}>
            {navItems.map((item) => {
              const isRoute = item.link.startsWith("/");
              const targetHref = isRoute ? item.link : isHome ? item.link : `/${item.link}`;

              return (
                <Tooltip key={item.id}>
                  <TooltipTrigger asChild>
                    <a
                      className={cn(
                        buttonVariants({
                          variant: "outline",
                          size: "icon",
                          className:
                            "size-7 rounded-lg hover:text-primary sm:size-9 [&_svg]:size-3.5 sm:[&_svg]:size-4",
                        }),
                      )}
                      href={targetHref}
                    >
                      <item.icon />
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>{item.name}</TooltipContent>
                </Tooltip>
              );
            })}
          </TooltipProvider>
          <AnimatedThemeToggler className="size-7 rounded-lg sm:size-9 [&_svg]:size-3.5 sm:[&_svg]:size-4" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
