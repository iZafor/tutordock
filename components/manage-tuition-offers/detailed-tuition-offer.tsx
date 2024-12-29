"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDays, Clock } from "lucide-react";
import { tuitionOfferMockData, tuitionApplicationMockData } from "@/lib/data";
import TuitionApplicationCard from "./tuition-application-card";
import { format } from "date-fns";
import { getStatusBadgeVariant, getStatusIcon } from "@/lib/ui-utils";
import { _24HourToAmPm } from "@/lib/utils";

export default function DetailedTuitionOffer({ offerId }: { offerId: string }) {
    const offerData = tuitionOfferMockData.filter(
        (offer) => offer.offerId === offerId
    )[0];
    const applications = tuitionApplicationMockData.filter(
        (app) => app.offerId === offerId
    );

    return (
        <div className="space-y-6">
            {/* Offer Details Section */}
            <Card>
                <CardHeader>
                    <div className="flex justify-between items-baseline">
                        <h3 className="text-xl font-semibold">
                            {offerData.subjects.join(", ")}
                        </h3>
                        <Badge
                            variant={getStatusBadgeVariant(offerData.status!)}
                            className="flex w-fit items-center gap-1"
                        >
                            {getStatusIcon(offerData.status!)}
                            {offerData.status!.charAt(0).toUpperCase() +
                                offerData.status!.slice(1)}
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent className="flex justify-between items-baseline">
                    <div>
                        <div className="text-sm text-muted-foreground mb-1">
                            Budget
                        </div>
                        <div className="flex items-baseline">
                            <p className="text-lg font-semibold">
                                BDT {` ${offerData.budget.amount}`}
                            </p>
                            <p className="text-sm text-muted-foreground">{`/${offerData.budget.rateType}`}</p>
                        </div>
                    </div>
                    <div>
                        <div className="text-sm text-muted-foreground mb-1">
                            Start Date
                        </div>
                        <div className="flex items-center gap-2">
                            <CalendarDays className="h-4 w-4 text-muted-foreground" />
                            <span>{format(offerData.startDate, "PPP")}</span>
                        </div>
                    </div>
                    <div>
                        <div className="text-sm text-muted-foreground mb-1">
                            Mode
                        </div>
                        <div className="flex items-center gap-2">
                            <span>
                                {offerData.mode.charAt(0).toUpperCase() +
                                    offerData.mode.slice(1)}
                            </span>
                        </div>
                    </div>
                    <div>
                        <div className="text-sm text-muted-foreground mb-1">
                            Schedule
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>
                                {_24HourToAmPm(offerData.schedule.startTime)} -{" "}
                                {_24HourToAmPm(offerData.schedule.endTime)}
                            </span>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-1">
                            {offerData.schedule.weekdays.map((day, idx) => (
                                <Badge
                                    key={idx}
                                    variant="outline"
                                    className="px-2 py-0.5 text-xs"
                                >
                                    {day}
                                </Badge>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Applications Section */}
            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle>Applications</CardTitle>
                        <Badge variant="secondary" className="px-3 py-1">
                            {applications.length} Total
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="all" className="w-full">
                        <TabsList className="mb-4">
                            <TabsTrigger value="all">
                                All Applications
                            </TabsTrigger>
                            <TabsTrigger value="accepted">Accepted</TabsTrigger>
                            <TabsTrigger value="shortlisted">
                                Shortlisted
                            </TabsTrigger>
                            <TabsTrigger value="pending">Pending</TabsTrigger>
                            <TabsTrigger value="rejected">Rejected</TabsTrigger>
                        </TabsList>
                        <TabsContent value="all">
                            <div className="space-y-4">
                                {applications.map((application) => (
                                    <TuitionApplicationCard
                                        key={application.applicationId}
                                        offerStatus={
                                            offerData.status === "accepted"
                                        }
                                        application={application}
                                    />
                                ))}
                            </div>
                        </TabsContent>
                        <TabsContent value="accepted">
                            <div className="space-y-4">
                                {applications
                                    .filter((app) => app.status === "accepted")
                                    .map((application) => (
                                        <TuitionApplicationCard
                                            key={application.applicationId}
                                            offerStatus={
                                                offerData.status === "accepted"
                                            }
                                            application={application}
                                        />
                                    ))}
                            </div>
                        </TabsContent>
                        <TabsContent value="shortlisted">
                            <div className="space-y-4">
                                {applications
                                    .filter(
                                        (app) => app.status === "shortlisted"
                                    )
                                    .map((application) => (
                                        <TuitionApplicationCard
                                            key={application.applicationId}
                                            offerStatus={
                                                offerData.status === "accepted"
                                            }
                                            application={application}
                                        />
                                    ))}
                            </div>
                        </TabsContent>
                        <TabsContent value="pending">
                            <div className="space-y-4">
                                {applications
                                    .filter((app) => app.status === "pending")
                                    .map((application) => (
                                        <TuitionApplicationCard
                                            key={application.applicationId}
                                            offerStatus={
                                                offerData.status === "accepted"
                                            }
                                            application={application}
                                        />
                                    ))}
                            </div>
                        </TabsContent>
                        <TabsContent value="rejected">
                            <div className="space-y-4">
                                {applications
                                    .filter((app) => app.status === "rejected")
                                    .map((application) => (
                                        <TuitionApplicationCard
                                            key={application.applicationId}
                                            offerStatus={
                                                offerData.status === "accepted"
                                            }
                                            application={application}
                                        />
                                    ))}
                            </div>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    );
}
