import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats next/image has to serve untouched. SVG rasterises when optimised,
 * and a GIF comes back re-encoded with its animation stripped, which fails
 * silently: the image still renders, it just stops moving.
 */
export function isUnoptimizedImage(src: string) {
  return src.endsWith(".svg") || src.endsWith(".gif");
}
