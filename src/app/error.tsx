"use client";

import { RotateCcw } from "lucide-react";
import { useEffect } from "react";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { Button } from "@/components/ui/button";

const ErrorBoundary = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  useEffect(() => {
    console.error("Unhandled application error:", error);
  }, [error]);

  return (
    <MaxWidthWrapper className="flex min-h-[calc(100dvh-64px)] flex-col items-center justify-center gap-4 pt-32 text-center">
      <h1 className="font-bold font-heading text-3xl sm:text-4xl">Something went wrong.</h1>
      <p className="max-w-md text-muted-foreground text-sm">
        An unexpected error occurred while rendering this page. Please try again.
      </p>
      <Button onClick={reset} variant="outline">
        <RotateCcw className="mr-2 size-4" />
        Try Again
      </Button>
    </MaxWidthWrapper>
  );
};

export default ErrorBoundary;
