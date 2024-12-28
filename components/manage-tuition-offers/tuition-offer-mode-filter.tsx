import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { StateSetter } from "@/lib/extra-types";

export default function TuitionOfferModeFilter({
    modeFilter,
    setModeFilter,
}: {
    modeFilter: string;
    setModeFilter: StateSetter<string>;
}) {
    return (
        <Select value={modeFilter} onValueChange={setModeFilter}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by Mode" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="all-modes">All Modes</SelectItem>
                <SelectItem value="online">Online</SelectItem>
                <SelectItem value="in-person">In-Person</SelectItem>
                <SelectItem value="hybrid">Hybrid</SelectItem>
            </SelectContent>
        </Select>
    );
}
