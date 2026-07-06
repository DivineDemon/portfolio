"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type * as React from "react";
import { useEffect } from "react";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  useEffect(() => {
    if (process.env.NODE_ENV !== "development") {
      return;
    }

    const originalError = console.error;
    console.error = (...args: Parameters<typeof console.error>) => {
      if (
        typeof args[0] === "string" &&
        args[0].includes(
          "Encountered a script tag while rendering React component",
        )
      ) {
        return;
      }

      originalError(...args);
    };

    return () => {
      console.error = originalError;
    };
  }, []);

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
