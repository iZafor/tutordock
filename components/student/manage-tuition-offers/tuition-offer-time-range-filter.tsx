import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { StateSetter } from "@/lib/extra-types";

type TimeRange = {
    start: string;
    end: string;
};

const TIME_SLOTS = Array.from({ length: 24 * 2 }).map((_, i) => {
    const hour = Math.floor(i / 2);
    const minute = i % 2 === 0 ? "00" : "30";
    const time24h = `${hour.toString().padStart(2, "0")}:${minute}`;

    // Format for display (AM/PM)
    const date = new Date(`2024-01-01T${time24h}`);
    const timeAMPM = date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    });

    return {
        value: time24h,
        label: timeAMPM,
    };
});

export default function TuitionOfferTimeRangeFilter({
    timeRange,
    setTimeRange,
}: {
    timeRange: TimeRange;
    setTimeRange: StateSetter<TimeRange>;
}) {
    return (
        <div className="flex gap-2 items-center">
            <Select
                value={timeRange.start}
                onValueChange={(value) =>
                    setTimeRange({ ...timeRange, start: value })
                }
            >
                <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Start Time" />
                </SelectTrigger>
                <SelectContent>
                    {TIME_SLOTS.map((time) => (
                        <SelectItem key={time.value} value={time.value}>
                            {time.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <span>to</span>
            <Select
                value={timeRange.end}
                onValueChange={(value) =>
                    setTimeRange({ ...timeRange, end: value })
                }
            >
                <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="End Time" />
                </SelectTrigger>
                <SelectContent>
                    {TIME_SLOTS.map((time) => (
                        <SelectItem key={time.value} value={time.value}>
                            {time.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}
