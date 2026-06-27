"use client";

import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics/track";
import { cn } from "@/lib/utils";

type BookingLinkProps = {
  url: string;
  className?: string;
};

const BookingLink = ({ url, className }: BookingLinkProps) => {
  return (
    <Button asChild variant="outline" className={cn("font-mono", className)}>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => {
          trackEvent(ANALYTICS_EVENTS.BOOKING_CLICK, {
            link_url: url,
            cta_location: "contact",
          });
        }}
      >
        Book a discovery call
        <ExternalLink className="size-4" aria-hidden />
      </a>
    </Button>
  );
};

export default BookingLink;
