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
import {
    Calendar,
    Monitor,
    Ellipsis,
    Eye,
    Bookmark,
    X,
    SendHorizontal,
} from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TuitionOffer } from "@/lib/types";
import { usePathname, useRouter } from "next/navigation";
import { getStatusBadgeVariant, getStatusIcon } from "@/lib/ui-utils";
import { _24HourToAmPm } from "@/lib/utils";
import TuitionOfferApplicationForm from "./tuition-offer-application-form";
import { useState } from "react";

export default function TuitionOfferTable({
    offers,
}: {
    offers: TuitionOffer[];
}) {
    const pathname = usePathname();
    const router = useRouter();
    const [applicationFormOpen, setApplicationFormOpen] = useState(false);
    const [selectedOffer, setSelectedOffer] = useState<TuitionOffer>();

    const isStudent = pathname.includes("/student");

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    {!isStudent && <TableHead>Student</TableHead>}
                    <TableHead>Subjects</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>Schedule</TableHead>
                    <TableHead>Mode</TableHead>
                    <TableHead>Budget</TableHead>
                    {isStudent && <TableHead>Status</TableHead>}
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {offers.length === 0 ? (
                    <TableRow>
                        <TableCell colSpan={8} className="text-center py-8">
                            No offers found matching your filters
                        </TableCell>
                    </TableRow>
                ) : (
                    offers.map((offer) => (
                        <TableRow key={offer.offerId}>
                            {/* Student Information - Only visible to tutors */}
                            {!isStudent && (
                                <TableCell>
                                    <div className="flex flex-col gap-1">
                                        <div className="flex items-center gap-2">
                                            <span className="font-medium">
                                                {offer.student?.name}
                                            </span>
                                            <Badge
                                                variant="secondary"
                                                className="text-xs"
                                            >
                                                {offer.student?.rating} ★
                                            </Badge>
                                        </div>
                                        <span className="text-sm text-muted-foreground">
                                            {offer.student?.grade}
                                        </span>
                                        <span className="text-xs text-muted-foreground truncate max-w-[200px]">
                                            {offer.student?.address}
                                        </span>
                                    </div>
                                </TableCell>
                            )}

                            <TableCell>{offer.subjects.join(", ")}</TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4" />
                                    {format(new Date(offer.startDate), "PPP")}
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

                            {/* Status - Only visible to students */}
                            {isStudent && (
                                <TableCell>
                                    <Badge
                                        variant={getStatusBadgeVariant(
                                            offer.status!
                                        )}
                                        className="flex w-fit items-center gap-1"
                                    >
                                        {getStatusIcon(offer.status!)}
                                        {offer.status!.charAt(0).toUpperCase() +
                                            offer.status!.slice(1)}
                                    </Badge>
                                </TableCell>
                            )}

                            {/* Actions */}
                            <TableCell className="text-right">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon">
                                            <Ellipsis className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        {isStudent ? (
                                            <>
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
                                                    <X className="mr-2 h-4 w-4" />
                                                    Reject Offer
                                                </DropdownMenuItem>
                                            </>
                                        ) : (
                                            <>
                                                <DropdownMenuItem
                                                    onClick={() => {
                                                        setApplicationFormOpen(
                                                            true
                                                        );
                                                        setSelectedOffer(offer);
                                                    }}
                                                >
                                                    <SendHorizontal className="mr-2 h-4 w-4" />
                                                    Apply
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <Bookmark className="mr-2 h-4 w-4" />
                                                    Shortlist
                                                </DropdownMenuItem>
                                            </>
                                        )}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))
                )}
            </TableBody>
            {applicationFormOpen && (
                <TuitionOfferApplicationForm
                    offer={selectedOffer!}
                    open={applicationFormOpen}
                    setOpen={setApplicationFormOpen}
                />
            )}
        </Table>
    );
}
