import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function slugToTitleCase(text: string) {
    return text
        .split("-")
        .map((s) => s.slice(0, 1).toUpperCase() + s.slice(1))
        .join(" ");
}
