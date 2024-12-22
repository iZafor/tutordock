import React from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Calendar,
    Star,
    Video,
    MessageSquare,
    FileText,
    MoreVertical,
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const activeTuitions = [
    {
        id: 1,
        subject: "Mathematics",
        topic: "Advanced Calculus",
        tutor: {
            name: "Dr. Smith",
            image: "/tutor1.jpg",
            rating: 4.8,
        },
        schedule: {
            days: ["Monday", "Thursday"],
            time: "3:00 PM - 4:30 PM",
        },
        progress: 75,
        nextClass: "Monday, 3:00 PM",
        completedClasses: 15,
        totalClasses: 20,
        tasks: {
            completed: 8,
            total: 10,
        },
        status: "active",
    },
    {
        id: 2,
        subject: "Physics",
        topic: "Quantum Mechanics",
        tutor: {
            name: "Prof. Johnson",
            image: "/tutor2.jpg",
            rating: 4.9,
        },
        schedule: {
            days: ["Wednesday", "Friday"],
            time: "4:00 PM - 5:30 PM",
        },
        progress: 60,
        nextClass: "Wednesday, 4:00 PM",
        completedClasses: 12,
        totalClasses: 20,
        tasks: {
            completed: 6,
            total: 8,
        },
        status: "active",
    },
];

const completedTuitions = [
    {
        id: 3,
        subject: "Chemistry",
        topic: "Organic Chemistry",
        tutor: {
            name: "Dr. Williams",
            image: "/tutor3.jpg",
            rating: 4.7,
        },
        schedule: {
            days: ["Tuesday", "Friday"],
            time: "2:00 PM - 3:30 PM",
        },
        progress: 100,
        completedClasses: 20,
        totalClasses: 20,
        tasks: {
            completed: 10,
            total: 10,
        },
        status: "completed",
        completionDate: "2024-11-15",
    },
];

export default function MyTuitions() {
    return (
        <div className="flex-1 space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">My Tuitions</h1>
                    <p className="text-muted-foreground">
                        Manage your tuition sessions
                    </p>
                </div>
            </div>

            <div className="flex gap-4 flex-wrap">
                <div className="flex-1 min-w-[200px]">
                    <Input
                        placeholder="Search subjects or tutors..."
                        className="w-full"
                    />
                </div>
                <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by Subject" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Subjects</SelectItem>
                        <SelectItem value="math">Mathematics</SelectItem>
                        <SelectItem value="physics">Physics</SelectItem>
                        <SelectItem value="chemistry">Chemistry</SelectItem>
                    </SelectContent>
                </Select>
                <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="recent">Most Recent</SelectItem>
                        <SelectItem value="progress">Progress</SelectItem>
                        <SelectItem value="alphabetical">
                            Alphabetical
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <Tabs defaultValue="active" className="space-y-6">
                <TabsList>
                    <TabsTrigger value="active">
                        Active ({activeTuitions.length})
                    </TabsTrigger>
                    <TabsTrigger value="completed">
                        Completed ({completedTuitions.length})
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="active" className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                        {activeTuitions.map((tuition) => (
                            <TuitionCard key={tuition.id} tuition={tuition} />
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="completed" className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                        {completedTuitions.map((tuition) => (
                            <TuitionCard key={tuition.id} tuition={tuition} />
                        ))}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}

function TuitionCard({ tuition }) {
    return (
        <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
                <div className="flex items-start justify-between">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-lg">
                                {tuition.subject}
                            </h3>
                            <Badge
                                variant={
                                    tuition.status === "active"
                                        ? "default"
                                        : "secondary"
                                }
                            >
                                {tuition.status === "active"
                                    ? "Ongoing"
                                    : "Completed"}
                            </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            {tuition.topic}
                        </p>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>
                                Download Materials
                            </DropdownMenuItem>
                            <DropdownMenuItem>Contact Tutor</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                <div className="mt-4 flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                        <AvatarImage src={tuition.tutor.image} />
                        <AvatarFallback>{tuition.tutor.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-medium">{tuition.tutor.name}</p>
                        <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm">
                                {tuition.tutor.rating}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="mt-6 space-y-4">
                    {tuition.status === "active" && (
                        <>
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span>Course Progress</span>
                                    <span>{tuition.progress}%</span>
                                </div>
                                <Progress
                                    value={tuition.progress}
                                    className="h-2"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="rounded-lg border p-3">
                                    <div className="flex items-center gap-2">
                                        <Video className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm font-medium">
                                            {tuition.completedClasses}/
                                            {tuition.totalClasses}
                                        </span>
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        Classes
                                    </p>
                                </div>
                                <div className="rounded-lg border p-3">
                                    <div className="flex items-center gap-2">
                                        <FileText className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm font-medium">
                                            {tuition.tasks.completed}/
                                            {tuition.tasks.total}
                                        </span>
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        tasks
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 text-sm">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <span>Next Class: {tuition.nextClass}</span>
                            </div>
                        </>
                    )}

                    {tuition.status === "completed" && (
                        <p className="text-sm text-muted-foreground">
                            Completed on{" "}
                            {new Date(
                                tuition.completionDate
                            ).toLocaleDateString()}
                        </p>
                    )}
                </div>

                <div className="mt-6 flex gap-2">
                    {tuition.status === "active" && (
                        <>
                            <Button className="flex-1">
                                <Video className="mr-2 h-4 w-4" />
                                Join Class
                            </Button>
                            <Button variant="outline" className="flex-1">
                                <MessageSquare className="mr-2 h-4 w-4" />
                                Message
                            </Button>
                        </>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
