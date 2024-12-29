import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Calendar, X } from "lucide-react"; // Added X icon
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { StateSetter } from "@/lib/extra-types";
import { cn } from "@/lib/utils";

type DateRange = {
    from: Date | undefined;
    to: Date | undefined;
};

export default function DateRangeFilter({
    dateRange,
    setDateRange,
    className,
}: {
    dateRange: DateRange;
    setDateRange: StateSetter<DateRange>;
    className?: string;
}) {
    const handleReset = () => {
        setDateRange({ from: undefined, to: undefined });
    };

    return (
        <div className={cn("relative flex items-center", className)}>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
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
            {(dateRange.from || dateRange.to) && (
                <Button
                    variant="ghost"
                    size="icon"
                    className="ml-1 h-8 w-8"
                    onClick={handleReset}
                >
                    <X className="h-4 w-4" />
                </Button>
            )}
        </div>
    );
}
