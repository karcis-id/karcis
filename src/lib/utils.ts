import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

export const formatSlug = (eventId: number, eventName: string) => {
  const safeName = eventName
    .toLowerCase()
    .replaceAll(/[^\w\d\s-]/g, "")
    .replaceAll(/\s+/g, "-")
  return `e${eventId}-${safeName}`
}
