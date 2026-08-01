import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import LogoDark from "@/assets/img/logo-dark.svg";
import LogoLight from "@/assets/img/logo-light.svg";
import { NAV_ITEMS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { AnimatedThemeToggler } from "../ui/animated-theme-toggler";
import { buttonVariants } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

const Navbar = () => {
  const location = useLocation();
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

  const isHome = location.pathname === "/";
  const navItems = !isHome ? NAV_ITEMS.filter((item) => item.link.startsWith("/")) : NAV_ITEMS;

  return (
    <nav className="fixed top-0 z-50 w-full p-2 sm:p-2.5">
      <div className="mx-auto flex max-w-3xl items-center justify-between rounded-xl border bg-background/70 px-2 py-2 shadow-xs backdrop-blur-md sm:px-3">
        <Link className="flex shrink-0 items-center justify-center gap-2 sm:gap-3" to="/">
          <img alt="Logo" className="size-7 sm:size-8" src={isDark ? LogoDark : LogoLight} />
          <h1 className="xs:block hidden font-bold font-heading text-xs leading-tight sm:text-sm">
            Mushood
            <br />
            <span className="text-primary">Hanif</span>
          </h1>
        </Link>

        <div className="flex items-center justify-center gap-1 sm:gap-2">
          {navItems.map((item) => {
            const isRoute = item.link.startsWith("/");
            const targetHref = isRoute ? item.link : isHome ? item.link : `/${item.link}`;

            return (
              <Tooltip key={item.id}>
                <TooltipTrigger asChild>
                  {isRoute ? (
                    <Link
                      className={cn(
                        buttonVariants({
                          variant: "outline",
                          size: "icon",
                          className:
                            "size-7 rounded-lg hover:text-primary sm:size-9 [&_svg]:size-3.5 sm:[&_svg]:size-4",
                        }),
                      )}
                      to={item.link}
                    >
                      <item.icon />
                    </Link>
                  ) : (
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
                  )}
                </TooltipTrigger>
                <TooltipContent>{item.name}</TooltipContent>
              </Tooltip>
            );
          })}
          <AnimatedThemeToggler className="size-7 rounded-lg sm:size-9 [&_svg]:size-3.5 sm:[&_svg]:size-4" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
