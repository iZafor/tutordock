import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { StateSetter } from "@/lib/extra-types";
import { Checkbox } from "@/components/ui/checkbox";
import { Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const WEEKDAYS = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
];

export default function TuitionOfferWeekdayFilter({
    selectedWeekdays,
    setSelectedWeekdays,
}: {
    selectedWeekdays: string[];
    setSelectedWeekdays: StateSetter<string[]>;
}) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    className="w-[180px] justify-start text-left font-normal"
                >
                    <Clock className="mr-2 h-4 w-4" />
                    {selectedWeekdays.length > 0
                        ? `${selectedWeekdays.length} selected`
                        : "Select weekdays"}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px]" align="start">
                <div className="space-y-2">
                    {WEEKDAYS.map((day) => (
                        <div key={day} className="flex items-center space-x-2">
                            <Checkbox
                                id={`d-${day}`}
                                checked={selectedWeekdays.includes(day)}
                                onCheckedChange={(checked) => {
                                    if (checked) {
                                        setSelectedWeekdays([
                                            ...selectedWeekdays,
                                            day,
                                        ]);
                                    } else {
                                        setSelectedWeekdays(
                                            selectedWeekdays.filter(
                                                (d) => d !== day
                                            )
                                        );
                                    }
                                }}
                            />
                            <Label htmlFor={`d-${day}`}>{day}</Label>
                        </div>
                    ))}
                </div>
            </PopoverContent>
        </Popover>
    );
}
