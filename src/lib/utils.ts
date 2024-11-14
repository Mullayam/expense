import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function getRandomColor() {
  const hue = Math.floor(Math.random() * 360); // Random hue between 0 and 360
  const saturation = 60 + Math.random() * 20;  // Saturation between 60% and 80%
  const lightness = 60 + Math.random() * 20;   // Lightness between 60% and 80%
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}