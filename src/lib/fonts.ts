import { Fira_Code, Noto_Sans, Playfair_Display } from "next/font/google";

export const notoSans = Noto_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-noto-sans",
});

export const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
});

export const firaCode = Fira_Code({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fira-code",
});

/** CSS variable class names applied on `<html>` for Tailwind font tokens. */
export const fontVariables = [
  notoSans.variable,
  playfairDisplay.variable,
  firaCode.variable,
].join(" ");
