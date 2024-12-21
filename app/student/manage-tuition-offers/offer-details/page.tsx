import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Clock, MapPin, Book, Users, Edit, Wallet } from "lucide-react";

const offerDetails = {
    status: "active",
    subjects: [{ name: "Mathematics" }, { name: "Physics" }],
    budget: {
        amount: 5000,
        rateType: "monthly",
    },
    timings: [
        {
            day: "Monday",
            startTime: "09:00",
            endTime: "10:00",
            isEnabled: true,
        },
        {
            day: "Wednesday",
            startTime: "09:00",
            endTime: "10:00",
            isEnabled: true,
        },
    ],
    startDate: "2024-01-01",
    mode: "hybrid",
    notes: "Looking for an experienced tutor",
    applications: [
        {
            id: "APP-001",
            tutorName: "John Doe",
            experience: "5 years",
            status: "pending",
            appliedDate: "2024-01-02",
        },
        // ... more applications
    ],
};

export default function TuitionOfferDetails() {
    return (
        <div className="py-4 space-y-6">
            <Tabs defaultValue="details">
                <div className="flex justify-between">
                    <TabsList>
                        <TabsTrigger value="details">Offer Details</TabsTrigger>
                        <TabsTrigger value="applications">
                            Applications
                            <Badge variant="secondary" className="ml-2">
                                {offerDetails.applications.length}
                            </Badge>
                        </TabsTrigger>
                    </TabsList>
                    <div className="flex items-center gap-4">
                        <Badge
                            variant={
                                offerDetails.status === "active"
                                    ? "success"
                                    : "warning"
                            }
                        >
                            {offerDetails.status.toUpperCase()}
                        </Badge>
                        <Button variant="outline">
                            <Edit className="w-4 h-4 mr-2" />
                            Edit Offer
                        </Button>
                    </div>
                </div>

                <TabsContent value="details" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <Book className="w-5 h-5" />
                                    Subjects
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex gap-2 flex-wrap">
                                    {offerDetails.subjects.map(
                                        (subject, index) => (
                                            <Badge
                                                key={index}
                                                variant="outline"
                                            >
                                                {subject.name}
                                            </Badge>
                                        )
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <Wallet className="w-5 h-5" />
                                    Budget
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-2xl font-bold">
                                    BDT {offerDetails.budget.amount}
                                    <span className="text-sm text-muted-foreground ml-2">
                                        /{offerDetails.budget.rateType}
                                    </span>
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <Clock className="w-5 h-5" />
                                    Schedule
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    {offerDetails.timings
                                        .filter((t) => t.isEnabled)
                                        .map((timing, index) => (
                                            <div
                                                key={index}
                                                className="flex justify-between items-center"
                                            >
                                                <span className="font-medium">
                                                    {timing.day}
                                                </span>
                                                <span className="text-muted-foreground">
                                                    {timing.startTime} -{" "}
                                                    {timing.endTime}
                                                </span>
                                            </div>
                                        ))}
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <MapPin className="w-5 h-5" />
                                    Mode & Start Date
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        Mode
                                    </p>
                                    <p className="font-medium capitalize">
                                        {offerDetails.mode}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        Start Date
                                    </p>
                                    <p className="font-medium">
                                        {offerDetails.startDate}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {offerDetails.notes && (
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">
                                    Additional Notes
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>{offerDetails.notes}</p>
                            </CardContent>
                        </Card>
                    )}
                </TabsContent>

                <TabsContent value="applications">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Users className="w-5 h-5" />
                                Applications
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ScrollArea className="h-[400px]">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Tutor Name</TableHead>
                                            <TableHead>Experience</TableHead>
                                            <TableHead>Applied Date</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {offerDetails.applications.map(
                                            (app) => (
                                                <TableRow key={app.id}>
                                                    <TableCell className="font-medium">
                                                        {app.tutorName}
                                                    </TableCell>
                                                    <TableCell>
                                                        {app.experience}
                                                    </TableCell>
                                                    <TableCell>
                                                        {app.appliedDate}
                                                    </TableCell>
                                                    <TableCell>
                                                        <Badge
                                                            variant={
                                                                app.status ===
                                                                "accepted"
                                                                    ? "success"
                                                                    : app.status ===
                                                                      "rejected"
                                                                    ? "destructive"
                                                                    : "warning"
                                                            }
                                                        >
                                                            {app.status}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                        >
                                                            View Details
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        )}
                                    </TableBody>
                                </Table>
                            </ScrollArea>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
