import type React from "react";
import { SidebarProvider } from "../ui/sidebar";
import { Toaster } from "../ui/sonner";
import { TooltipProvider } from "../ui/tooltip";
import { ThemeProvider } from "./theme-provider";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SidebarProvider>
        <TooltipProvider>
          <Toaster richColors={true} duration={1500} />
          {children}
        </TooltipProvider>
      </SidebarProvider>
    </ThemeProvider>
  );
};

export default Providers;
