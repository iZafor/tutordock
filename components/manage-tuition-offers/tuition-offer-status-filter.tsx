import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StateSetter } from "@/lib/extra-types";

export default function TuitionOfferStatusFilter({statusFilter, setStatusFilter}: {
    statusFilter: string;
    setStatusFilter: StateSetter<string>;
}) {
    return (
        <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="all-status">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="accepted">Accepted</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
        </Select>
    );
}
