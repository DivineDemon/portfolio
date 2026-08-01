import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getImageSrc(img: unknown): string {
  if (!img) return "";
  if (typeof img === "string") return img;
  if (typeof img === "object") {
    if ("src" in img && typeof (img as { src: unknown }).src === "string") {
      return (img as { src: string }).src;
    }
    if ("default" in img) {
      const def = (img as { default: unknown }).default;
      if (typeof def === "string") return def;
      if (
        def &&
        typeof def === "object" &&
        "src" in def &&
        typeof (def as { src: unknown }).src === "string"
      ) {
        return (def as { src: string }).src;
      }
    }
  }
  return "";
}
