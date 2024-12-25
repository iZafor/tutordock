import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function FilterBar({
    onSearchChange,
    onStatusChange,
    showTypeFilter = false,
}: {
    onSearchChange: (value: string) => void;
    onStatusChange: (value: string) => void;
    onTypeChange?: (value: string) => void;
    showTypeFilter?: boolean;
}) {
    return (
        <div className="flex space-x-4 mb-6">
            <div className="flex-1 relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Search..."
                    className="pl-8"
                    onChange={(e) => onSearchChange(e.target.value)}
                />
            </div>
            <Select onValueChange={onStatusChange}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue
                        placeholder={
                            showTypeFilter
                                ? "Filter by type"
                                : "Filter by status"
                        }
                    />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    {showTypeFilter ? (
                        <>
                            <SelectItem value="document">Documents</SelectItem>
                            <SelectItem value="video">Videos</SelectItem>
                            <SelectItem value="link">Links</SelectItem>
                        </>
                    ) : (
                        <>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="overdue">Overdue</SelectItem>
                        </>
                    )}
                </SelectContent>
            </Select>
        </div>
    );
}
