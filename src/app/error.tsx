"use client";

import { AlertTriangle } from "lucide-react";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import {
  ErrorState,
  ErrorStateActions,
  GoHomeButton,
} from "@/components/ui/error-state";

export default function RouteError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <ErrorState
      icon={AlertTriangle}
      title="Something went wrong"
      description="An unexpected error occurred while loading this page. You can try again or head back home."
      action={
        <ErrorStateActions>
          <Button onClick={reset}>Try again</Button>
          <GoHomeButton />
        </ErrorStateActions>
      }
    />
  );
}
