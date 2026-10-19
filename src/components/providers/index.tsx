"use client";

import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";
import { Toaster } from "../ui/sonner";
import { TooltipProvider } from "../ui/tooltip";

interface ProvidersProps {
  children: ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      disableTransitionOnChange
      enableSystem={false}
      storageKey="theme"
    >
      <TooltipProvider>
        <Toaster duration={1500} richColors />
        {children}
      </TooltipProvider>
    </ThemeProvider>
  );
};

export default Providers;
