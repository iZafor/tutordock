"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TuitionApplication } from "@/lib/types";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
    Star,
    Briefcase,
    Users,
    Bookmark,
    CheckCircle2,
    XCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getStatusBadgeVariant, getStatusIcon } from "@/lib/ui-utils";
import { _24HourToAmPm } from "@/lib/utils";

export default function TuitionApplicationCard({
    offerStatus,
    application,
}: {
    offerStatus: boolean;
    application: TuitionApplication;
}) {
    const handleShortlist = () => {
        console.log("Shortlist application:", application.applicationId);
    };

    const handleAccept = () => {
        console.log("Accept application:", application.applicationId);
    };

    const handleReject = () => {
        console.log("Reject application:", application.applicationId);
    };

    const isAccepted = application.status === "accepted";
    const isRejected = application.status === "rejected";

    return (
        <Card className="backdrop-blur-md">
            <CardContent className="p-4">
                <div className="flex gap-6">
                    <Avatar className="h-16 w-16">
                        <AvatarFallback className="text-lg">
                            {application.tutor
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-xl font-semibold">
                                    {application.tutor}
                                </h3>
                                <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                                    <div className="flex items-center gap-1">
                                        <Star className="h-4 w-4 text-yellow-400" />
                                        {application.rating}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Briefcase className="h-4 w-4" />
                                        {application.experience}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Users className="h-4 w-4" />
                                        {application.totalTuitions} tuitions
                                    </div>
                                </div>
                            </div>
                            <Badge
                                variant={getStatusBadgeVariant(
                                    application.status
                                )}
                                className="flex w-fit items-center gap-1"
                            >
                                {getStatusIcon(application.status)}
                                {application.status.charAt(0).toUpperCase() +
                                    application.status.slice(1)}
                            </Badge>
                        </div>

                        <div className="grid grid-cols-3 gap-4 mb-4">
                            {application.preferredSchedule && (
                                <div>
                                    <div className="text-sm text-gray-500 mb-2">
                                        Preferred Schedule
                                    </div>
                                    <div className="space-y-1">
                                        <div className="text-sm">
                                            {_24HourToAmPm(
                                                application.preferredSchedule
                                                    .startTime
                                            )}{" "}
                                            -{" "}
                                            {_24HourToAmPm(
                                                application.preferredSchedule
                                                    .endTime
                                            )}
                                        </div>
                                        <div className="flex flex-wrap gap-1">
                                            {application.preferredSchedule.weekdays.map(
                                                (day, idx) => (
                                                    <Badge
                                                        key={idx}
                                                        variant="outline"
                                                        className="px-2 py-0.5 text-xs"
                                                    >
                                                        {day}
                                                    </Badge>
                                                )
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                            {application.expectedBudget && (
                                <div>
                                    <div className="text-sm text-gray-500 mb-1">
                                        Expected Rate
                                    </div>
                                    <div className="flex items-baseline">
                                        <p className="text-lg font-semibold">
                                            BDT{" "}
                                            {` ${application.expectedBudget.amount}`}
                                        </p>
                                        <p className="text-sm text-muted-foreground">{`/${application.expectedBudget.rateType}`}</p>
                                    </div>
                                </div>
                            )}
                            {application.preferredMode && (
                                <div>
                                    <div className="text-sm text-gray-500 mb-2">
                                        Preferred Mode
                                    </div>
                                    <Badge
                                        variant="secondary"
                                        className="px-3 py-1"
                                    >
                                        {application.preferredMode
                                            .charAt(0)
                                            .toUpperCase() +
                                            application.preferredMode.slice(1)}
                                    </Badge>
                                </div>
                            )}
                        </div>

                        <div className="space-y-4">
                            <div>
                                <div className="text-sm text-gray-500 mb-2">
                                    Specializations
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {application.specialization.map(
                                        (spec, index) => (
                                            <Badge
                                                key={index}
                                                variant="secondary"
                                                className="px-3 py-1"
                                            >
                                                {spec}
                                            </Badge>
                                        )
                                    )}
                                </div>
                            </div>
                            <p className="text-sm font-semibold text-muted-foreground">
                                {application.message}
                            </p>

                            <div className="flex items-center gap-2 pt-4 border-t">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="gap-1"
                                    onClick={handleShortlist}
                                    disabled={
                                        offerStatus || isAccepted || isRejected
                                    }
                                >
                                    <Bookmark className="h-4 w-4" />
                                    Shortlist
                                </Button>

                                <Button
                                    size="sm"
                                    className="gap-1"
                                    onClick={handleAccept}
                                    disabled={
                                        offerStatus || isAccepted || isRejected
                                    }
                                >
                                    <CheckCircle2 className="h-4 w-4" />
                                    Accept
                                </Button>

                                <Button
                                    variant="destructive"
                                    size="sm"
                                    className="gap-1"
                                    onClick={handleReject}
                                    disabled={
                                        offerStatus || isAccepted || isRejected
                                    }
                                >
                                    <XCircle className="h-4 w-4" />
                                    Reject
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
