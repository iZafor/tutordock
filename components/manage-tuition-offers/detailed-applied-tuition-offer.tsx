import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    CalendarIcon,
    MapPin,
    Monitor,
    Calendar,
    X,
    BookOpen,
    GraduationCap,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { tuitionOfferMockDataForTutorApplied as offers } from "@/lib/data";
import { getStatusBadgeVariant, getStatusIcon } from "@/lib/ui-utils";
import { _24HourToAmPm } from "@/lib/utils";
import { format } from "date-fns";
import { TuitionOffer } from "@/lib/types";

export default function DetailedAppliedTuitionOffer({
    offerId,
}: {
    offerId: string;
}) {
    const offer = offers.find((o) => o.offerId === offerId) as TuitionOffer;

    const formatSchedule = (schedule: {
        weekdays: string[];
        startTime: string;
        endTime: string;
    }) => (
        <div className="flex gap-2 items-center">
            <div className="font-medium">{schedule.weekdays.join(", ")}</div>
            <Separator orientation="vertical" className="h-4" />
            <div className="text-muted-foreground">
                {_24HourToAmPm(schedule.startTime)} -{" "}
                {_24HourToAmPm(schedule.endTime)}
            </div>
        </div>
    );

    const formatBudget = (budget: { amount: number; rateType: string }) => (
        <div className="flex items-baseline gap-1">
            <span className="text-xl font-semibold">
                BDT{" " + budget.amount.toLocaleString()}
            </span>
            <span className="text-muted-foreground">per {budget.rateType}</span>
        </div>
    );

    return (
        <div className="space-y-6 mt-6">
            <div className="flex items-center justify-between bg-card p-6 rounded-lg border">
                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <GraduationCap className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <h2 className="text-2xl font-semibold">
                                {offer.student?.name}
                            </h2>
                            <Badge variant="secondary" className="text-xs">
                                {offer.student?.rating} ★
                            </Badge>
                        </div>
                        <p className="text-muted-foreground">
                            {offer.student?.grade}
                        </p>
                        <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                            <MapPin className="w-4 h-4" />
                            {offer.student?.address}
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <Badge
                        variant={getStatusBadgeVariant(offer.status!)}
                        className="py-2"
                    >
                        {getStatusIcon(offer.status!)}
                        <span className="ml-1">{offer.status}</span>
                    </Badge>
                    {offer.status === "pending" && (
                        <Button variant="destructive">
                            <X className="size-4" />
                            Cancel Application
                        </Button>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                <Card>
                    <CardContent className="pt-6">
                        <h3 className="font-medium mb-4">Important Dates</h3>
                        <div className="space-y-4">
                            <div>
                                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                                    <Calendar className="w-4 h-4" />
                                    <span className="text-sm">
                                        Application Date
                                    </span>
                                </div>
                                <p className="font-medium">
                                    {format(offer.applicationDate!, "PPP")}
                                </p>
                            </div>
                            <div>
                                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                                    <CalendarIcon className="w-4 h-4" />
                                    <span className="text-sm">Start Date</span>
                                </div>
                                <p className="font-medium">
                                    {format(offer.startDate, "PPP")}
                                </p>
                            </div>
                            {offer.acceptedDate && (
                                <div>
                                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                                        <CalendarIcon className="w-4 h-4" />
                                        <span className="text-sm">
                                            Accepted on
                                        </span>
                                    </div>
                                    <p className="font-medium">
                                        {format(offer.acceptedDate, "PPP")}
                                    </p>
                                </div>
                            )}
                            {offer.rejectedDate && (
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <CalendarIcon className="w-4 h-4" />
                                        <span className="text-sm">
                                            Rejected on
                                        </span>
                                    </div>
                                    <p className="font-medium">
                                        {format(offer.rejectedDate, "PPP")}
                                    </p>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="pt-6">
                        <h3 className="font-medium mb-4">Mode of Tuition</h3>
                        <div className="space-y-3">
                            <div>
                                <p className="text-sm text-muted-foreground mb-2">
                                    Current
                                </p>
                                <div className="flex items-center gap-2">
                                    {offer.mode === "online" && (
                                        <Monitor className="w-4 h-4 text-muted-foreground" />
                                    )}
                                    <Badge variant="outline">
                                        {offer.mode}
                                    </Badge>
                                </div>
                            </div>
                            {offer.preferredMode &&
                                offer.preferredMode !== offer.mode && (
                                    <div>
                                        <p className="text-sm text-muted-foreground mb-2">
                                            Preferred
                                        </p>
                                        <div className="flex items-center gap-2">
                                            <Monitor className="w-4 h-4 text-muted-foreground" />
                                            <Badge variant="outline">
                                                {offer.preferredMode}
                                            </Badge>
                                        </div>
                                    </div>
                                )}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="pt-6">
                        <h3 className="font-medium mb-4">Subjects</h3>
                        <div className="flex flex-wrap gap-2">
                            {offer.subjects.map((subject) => (
                                <div
                                    key={subject}
                                    className="flex items-center gap-2 bg-muted px-3 py-1.5 rounded-md"
                                >
                                    <BookOpen className="w-4 h-4 text-muted-foreground" />
                                    <span>{subject}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="pt-6">
                        <h3 className="font-medium mb-4">Budget</h3>
                        <div className="space-y-3">
                            <div>
                                <p className="text-sm text-muted-foreground mb-1">
                                    Current
                                </p>
                                {formatBudget(offer.budget)}
                            </div>
                            {offer.preferredBudget && (
                                <div>
                                    <p className="text-sm text-muted-foreground mb-1">
                                        Preferred
                                    </p>
                                    {formatBudget(offer.preferredBudget)}
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="pt-6">
                        <h3 className="font-medium mb-4">Schedule</h3>
                        <div className="space-y-4">
                            <div>
                                <p className="text-sm text-muted-foreground mb-2">
                                    Current Schedule
                                </p>
                                {formatSchedule(offer.schedule)}
                            </div>
                            {offer.preferredSchedule && (
                                <div>
                                    <p className="text-sm text-muted-foreground mb-2">
                                        Preferred Schedule
                                    </p>
                                    {formatSchedule(offer.preferredSchedule)}
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
