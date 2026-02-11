"use client";

import { MenuIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import MaxWidthWrapper from "@/components/ui/max-width-wrapper";
import { AnimatedThemeToggler } from "../ui/animated-theme-toggler";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

const NAV_ITEMS = [
  { label: "Services", href: "/#services" },
  { label: "Projects", href: "/#projects" },
  { label: "Testimonials", href: "/#testimonials" },
  { label: "Contact", href: "/#contact" },
] as const;

const Navbar = () => {
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <MaxWidthWrapper
      parentBorder="border-b"
      className="sticky top-0 z-50 bg-background/10 backdrop-blur-md"
    >
      <nav className="flex w-full items-center justify-center p-4 md:p-5">
        <Link href="/" className="flex shrink-0" aria-label="Home">
          <Image
            alt="logo"
            width={20}
            height={20}
            src="/logo.svg"
            className="size-6 dark:invert"
          />
        </Link>
        <div className="flex flex-1 items-center justify-end gap-2.5 text-sm max-md:hidden">
          {NAV_ITEMS.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="rounded-full px-4 py-1 transition-all duration-300 hover:bg-muted hover:font-medium"
            >
              {label}
            </Link>
          ))}
        </div>
        <div className="flex flex-1 items-center justify-end gap-2 md:hidden">
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon-sm"
                aria-label="Open menu"
                className="shrink-0"
              >
                <MenuIcon className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex flex-col">
              <SheetHeader>
                <SheetTitle className="sr-only">Navigation</SheetTitle>
              </SheetHeader>
              <div className="flex flex-1 flex-col gap-1 pt-6">
                {NAV_ITEMS.map(({ label, href }) => (
                  <Link
                    key={label}
                    href={href}
                    className="rounded-lg px-4 py-3 text-base transition-colors hover:bg-muted hover:font-medium"
                    onClick={() => setSheetOpen(false)}
                  >
                    {label}
                  </Link>
                ))}
              </div>
              <div className="border-t pt-4">
                <AnimatedThemeToggler size="icon-sm" variant="ghost" />
              </div>
            </SheetContent>
          </Sheet>
        </div>
        <div className="max-md:hidden">
          <AnimatedThemeToggler size="icon-sm" variant="ghost" />
        </div>
      </nav>
    </MaxWidthWrapper>
  );
};

export default Navbar;
