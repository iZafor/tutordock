"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Calendar, Monitor, Ellipsis, Eye, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TuitionOffer } from "@/lib/types";
import { usePathname, useRouter } from "next/navigation";
import { getStatusBadgeVariant, getStatusIcon } from "@/lib/ui-utils";
import { _24HourToAmPm } from "@/lib/utils";

export default function TuitionOfferTable({
    offers,
}: {
    offers: TuitionOffer[];
}) {
    const pathname = usePathname();
    const router = useRouter();

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Subjects</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>Schedule</TableHead>
                    <TableHead>Mode</TableHead>
                    <TableHead>Budget</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {offers.length === 0 ? (
                    <TableRow>
                        <TableCell colSpan={7} className="text-center py-8">
                            No offers found matching your filters
                        </TableCell>
                    </TableRow>
                ) : (
                    offers.map((offer) => (
                        <TableRow key={offer.offerId}>
                            <TableCell>{offer.subjects.join(", ")}</TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4" />
                                    {format(offer.startDate, "PPP")}
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="flex flex-col gap-1">
                                    <span className="text-sm font-medium">
                                        {offer.schedule.weekdays.join(", ")}
                                    </span>
                                    <span className="text-sm text-muted-foreground">
                                        {_24HourToAmPm(
                                            offer.schedule.startTime
                                        )}{" "}
                                        -{" "}
                                        {_24HourToAmPm(offer.schedule.endTime)}
                                    </span>
                                </div>
                            </TableCell>
                            <TableCell>
                                <Badge variant="outline">
                                    {offer.mode === "online" && (
                                        <Monitor className="mr-1 h-3 w-3" />
                                    )}
                                    {offer.mode.charAt(0).toUpperCase() +
                                        offer.mode.slice(1)}
                                </Badge>
                            </TableCell>
                            <TableCell>
                                <div className="flex flex-col">
                                    <span className="font-medium">
                                        BDT {offer.budget.amount}
                                    </span>
                                    <span className="text-sm text-muted-foreground">
                                        per {offer.budget.rateType}
                                    </span>
                                </div>
                            </TableCell>
                            <TableCell>
                                <Badge
                                    variant={getStatusBadgeVariant(
                                        offer.status
                                    )}
                                    className="flex w-fit items-center gap-1"
                                >
                                    {getStatusIcon(offer.status)}
                                    {offer.status.charAt(0).toUpperCase() +
                                        offer.status.slice(1)}
                                </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon">
                                            <Ellipsis className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem
                                            onClick={() =>
                                                router.push(
                                                    pathname +
                                                        `/${offer.offerId}`
                                                )
                                            }
                                        >
                                            <Eye className="mr-2 h-4 w-4" />
                                            View Details
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="text-destructive">
                                            <Trash2 className="mr-2 h-4 w-4" />
                                            Delete Offer
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))
                )}
            </TableBody>
        </Table>
    );
}
