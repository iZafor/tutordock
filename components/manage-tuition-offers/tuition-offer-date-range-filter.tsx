import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Calendar } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { StateSetter } from "@/lib/extra-types";

type DateRange = {
    from: Date | undefined;
    to: Date | undefined;
};

export default function TuitionOfferDateRangeFilter({
    dateRange,
    setDateRange,
}: {
    dateRange: DateRange;
    setDateRange: StateSetter<DateRange>;
}) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    className="w-[240px] justify-start text-left font-normal"
                >
                    <Calendar className="mr-2 h-4 w-4" />
                    {dateRange.from ? (
                        dateRange.to ? (
                            <>
                                {format(dateRange.from, "LLL dd, y")} -{" "}
                                {format(dateRange.to, "LLL dd, y")}
                            </>
                        ) : (
                            format(dateRange.from, "LLL dd, y")
                        )
                    ) : (
                        <span>Pick a date range</span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent
                    initialFocus
                    mode="range"
                    defaultMonth={dateRange.from}
                    selected={{
                        from: dateRange.from,
                        to: dateRange.to,
                    }}
                    // @ts-expect-error - the new range could be undefined
                    onSelect={setDateRange}
                    numberOfMonths={2}
                />
            </PopoverContent>
        </Popover>
    );
}
