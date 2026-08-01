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

  return (
    <nav className="fixed top-0 z-50 w-full p-2.5">
      <div className="mx-auto flex max-w-3xl items-center justify-between rounded-lg border bg-background/50 p-2.5 shadow-xs backdrop-blur-md">
        <Link className="flex items-center justify-center gap-3.5" to="/">
          <img alt="Logo" className="size-8.5" src={isDark ? LogoDark : LogoLight} />
          <h1 className="font-bold font-heading text-sm leading-[19px]">
            Mushood
            <br />
            <span className="text-primary">Hanif</span>
          </h1>
        </Link>

        <div className="flex items-center justify-center gap-2.5">
          {NAV_ITEMS.map((item) => {
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
                          className: "rounded-lg hover:text-primary",
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
                          className: "rounded-lg hover:text-primary",
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
          <AnimatedThemeToggler className="rounded-lg" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
