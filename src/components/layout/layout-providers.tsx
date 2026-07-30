"use client";

import type * as React from "react";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";

export function LayoutProviders({ children }: { children: React.ReactNode }) {
	return (
		<ThemeProvider attribute="class" defaultTheme="dark">
			<TooltipProvider delayDuration={0}>
				<div className="absolute inset-x-0 top-0 h-[100px] overflow-hidden z-0 pointer-events-none">
					<FlickeringGrid
						color="var(--primary)"
						className="h-full w-full"
						squareSize={2}
						gridGap={2}
						style={{
							maskImage: "linear-gradient(to bottom, black, transparent)",
							WebkitMaskImage: "linear-gradient(to bottom, black, transparent)",
						}}
					/>
				</div>
				{children}
				<Navbar />
			</TooltipProvider>
		</ThemeProvider>
	);
}
