"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Budget, Schedule, StudentInfo, TuitionOffer } from "@/lib/types";
import { getStatusBadgeVariant, getStatusIcon } from "@/lib/ui-utils";
import { _24HourToAmPm } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Calendar, Ellipsis, Eye, Monitor, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export const myApplicationsTableColumns: ColumnDef<TuitionOffer>[] = [
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
        accessorKey: "status",
        header: "Status",
        cell: ({ getValue }) => {
            const status = getValue() as string;

            return (
                <Badge
                    variant={getStatusBadgeVariant(status!)}
                    className="flex w-fit items-center gap-1"
                >
                    {getStatusIcon(status!)}
                    {status!.charAt(0).toUpperCase() + status!.slice(1)}
                </Badge>
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
    const pathname = usePathname();
    const router = useRouter();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                    <Ellipsis className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem
                    onClick={() => router.push(pathname + `/${offer.offerId}`)}
                >
                    <Eye className="mr-2 size-4" />
                    View Details
                </DropdownMenuItem>
                {offer.status === "pending" && (
                    <DropdownMenuItem className="text-destructive">
                        <X className="mr-2 size-4" />
                        Cancel
                    </DropdownMenuItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
