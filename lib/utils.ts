import { clsx, type ClassValue } from "clsx";
import { addDays, format } from "date-fns";
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

const WEEK_DAYS: { [key: string]: number } = {
    Sunday: 0,
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
};

export function getNextClassDateText(sessionDays: string[]) {
    const today = new Date();
    return format(
        addDays(
            today,
            Math.abs(
                sessionDays
                    .map((d) => today.getDay() - WEEK_DAYS[d])
                    .sort((a, b) => a - b)[0]
            )
        ),
        "PPP"
    );
}
