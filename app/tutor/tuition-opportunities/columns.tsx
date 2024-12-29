import TuitionOfferApplicationForm from "@/components/manage-tuition-offers/tuition-offer-application-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Budget, Schedule, StudentInfo, TuitionOffer } from "@/lib/types";
import { _24HourToAmPm } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import {
    Bookmark,
    Calendar,
    Ellipsis,
    Monitor,
    SendHorizontal,
} from "lucide-react";
import { useState } from "react";

export const tuitionOpportunitiesTableColumns: ColumnDef<TuitionOffer>[] = [
    {
        accessorKey: "student",
        header: "Student",
        cell: ({ getValue }) => {
            const value = getValue() as StudentInfo;
            return (
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                        <span className="font-medium">{value.name}</span>
                        <Badge variant="secondary" className="text-xs">
                            {value.rating} ★
                        </Badge>
                    </div>
                    <span className="text-sm text-muted-foreground">
                        {value.grade}
                    </span>
                    <span className="text-xs text-muted-foreground truncate max-w-[200px]">
                        {value.address}
                    </span>
                </div>
            );
        },
    },
    {
        accessorKey: "subjects",
        header: "Subjects",
        cell: ({ getValue }) => (
            <span>{(getValue() as string[]).join(",")}</span>
        ),
    },
    {
        accessorKey: "startDate",
        header: "Stat Date",
        cell: ({ getValue }) => (
            <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {format(new Date(getValue() as string), "PPP")}
            </div>
        ),
    },
    {
        accessorKey: "schedule",
        header: "Schedule",
        cell: ({ getValue }) => {
            const value = getValue() as Schedule;

            return (
                <div className="flex flex-col gap-1">
                    <span className="text-sm font-medium">
                        {value.weekdays.join(", ")}
                    </span>
                    <span className="text-sm text-muted-foreground">
                        {_24HourToAmPm(value.startTime)} -{" "}
                        {_24HourToAmPm(value.endTime)}
                    </span>
                </div>
            );
        },
    },
    {
        accessorKey: "mode",
        header: "Mode",
        cell: ({ getValue }) => {
            const value = getValue() as string;

            return (
                <Badge variant="outline">
                    {value === "online" && <Monitor className="mr-1 h-3 w-3" />}
                    {value.charAt(0).toUpperCase() + value.slice(1)}
                </Badge>
            );
        },
    },
    {
        accessorKey: "budget",
        header: "Budget",
        cell: ({ getValue }) => {
            const value = getValue() as Budget;

            return (
                <div className="flex flex-col">
                    <span className="font-medium">BDT {value.amount}</span>
                    <span className="text-sm text-muted-foreground">
                        per {value.rateType}
                    </span>
                </div>
            );
        },
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => <Actions offer={row.original} />,
    },
];

function Actions({ offer }: { offer: TuitionOffer }) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <Ellipsis className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setOpen(true)}>
                        <SendHorizontal className="mr-2 size-4" />
                        Apply
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Bookmark className="mr-2 size-4" />
                        Shortlist
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <TuitionOfferApplicationForm
                offer={offer}
                open={open}
                setOpen={setOpen}
            />
        </>
    );
}
