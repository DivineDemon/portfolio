"use client";

import { ExternalLink, MenuIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import TrackedLink, {
  trackCtaClick,
} from "@/components/analytics/tracked-link";
import MaxWidthWrapper from "@/components/ui/max-width-wrapper";
import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics/track";
import { navItems } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

type NavbarProps = {
  bookingUrl?: string | null;
};

const Navbar = ({ bookingUrl }: NavbarProps) => {
  const [sheetOpen, setSheetOpen] = useState(false);
  const hasBookingUrl = Boolean(bookingUrl?.trim());

  return (
    <MaxWidthWrapper
      showPlusIcons={false}
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
          {navItems.map(({ label, href }) => (
            <TrackedLink
              key={label}
              href={href}
              eventName={ANALYTICS_EVENTS.CTA_CLICK}
              eventParams={{
                cta_label: label,
                cta_location: "navbar",
              }}
              className="rounded-full px-4 py-1 transition-all duration-300 hover:bg-muted"
            >
              {label}
            </TrackedLink>
          ))}
          {hasBookingUrl && (
            <a
              href={bookingUrl ?? undefined}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                trackEvent(ANALYTICS_EVENTS.BOOKING_CLICK, {
                  link_url: bookingUrl ?? "",
                  cta_location: "navbar",
                });
              }}
              className={cn(
                buttonVariants({ variant: "default", size: "sm" }),
                "rounded-full font-mono",
              )}
            >
              Book a call
              <ExternalLink className="size-3.5" aria-hidden />
            </a>
          )}
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
            <SheetContent
              side="right"
              className="flex flex-col space-y-0 gap-0"
            >
              <SheetHeader className="border-b">
                <SheetTitle>Navigation</SheetTitle>
                <SheetDescription>
                  Navigate to the sections of the website.
                </SheetDescription>
              </SheetHeader>
              <div className="flex flex-1 flex-col items-start justify-start">
                {navItems.map(({ label, href }) => (
                  <Link
                    key={label}
                    href={href}
                    className="w-full p-4 border-b text-sm font-medium transition-all duration-300 hover:bg-muted"
                    onClick={() => {
                      trackCtaClick(label, "navbar_mobile");
                      setSheetOpen(false);
                    }}
                  >
                    {label}
                  </Link>
                ))}
                {hasBookingUrl && (
                  <a
                    href={bookingUrl ?? undefined}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full border-b p-4 text-sm font-medium transition-all duration-300 hover:bg-muted"
                    onClick={() => {
                      trackEvent(ANALYTICS_EVENTS.BOOKING_CLICK, {
                        link_url: bookingUrl ?? "",
                        cta_location: "navbar_mobile",
                      });
                      setSheetOpen(false);
                    }}
                  >
                    Book a call
                  </a>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </MaxWidthWrapper>
  );
};

export default Navbar;
