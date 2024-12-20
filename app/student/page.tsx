import React from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    GraduationCap,
    LineChart,
    Clock,
    Bell,
    BookOpen,
    FileText,
    Video,
    Trophy,
    Activity,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

const activeTuitions = [
    {
        subject: "Mathematics",
        tutor: "Dr. Smith",
        nextClass: "Monday, 3:00 PM",
        progress: 75,
    },
    {
        subject: "Physics",
        tutor: "Prof. Johnson",
        nextClass: "Wednesday, 4:00 PM",
        progress: 60,
    },
    {
        subject: "Chemistry",
        tutor: "Dr. Williams",
        nextClass: "Thursday, 2:00 PM",
        progress: 85,
    },
];

const recentActivities = [
    {
        type: "Assignment",
        subject: "Mathematics",
        description: "Calculus homework submitted",
        time: "2 hours ago",
        icon: FileText,
    },
    {
        type: "Session",
        subject: "Physics",
        description: "Attended live class",
        time: "Yesterday",
        icon: Video,
    },
    {
        type: "Quiz",
        subject: "Chemistry",
        description: "Scored 90% in pop quiz",
        time: "2 days ago",
        icon: Trophy,
    },
];

const performanceMetrics = [
    {
        subject: "Mathematics",
        attendance: 95,
        assignments: 88,
        quizzes: 82,
    },
    {
        subject: "Physics",
        attendance: 90,
        assignments: 85,
        quizzes: 78,
    },
    {
        subject: "Chemistry",
        attendance: 92,
        assignments: 90,
        quizzes: 88,
    },
];

export default function StudentDashboard() {
    return (
        <div className="flex min-h-screen bg-background">
            <div className="w-full space-y-6 p-8">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold">Dashboard</h1>
                        <p className="text-muted-foreground">
                            Welcome back, Boogeyman
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <Button
                            variant="outline"
                            size="icon"
                            className="relative"
                        >
                            <Bell className="h-5 w-5" />
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                3
                            </span>
                        </Button>
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>BG</AvatarFallback>
                        </Avatar>
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Tuitions
                            </CardTitle>
                            <BookOpen className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">5</div>
                            <p className="text-xs text-muted-foreground">
                                Active courses
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">
                                Study Hours
                            </CardTitle>
                            <Clock className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">12.5</div>
                            <p className="text-xs text-muted-foreground">
                                This week
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">
                                Tasks
                            </CardTitle>
                            <FileText className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">8/10</div>
                            <p className="text-xs text-muted-foreground">
                                Completed
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">
                                Overall Progress
                            </CardTitle>
                            <Activity className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">78%</div>
                            <p className="text-xs text-muted-foreground">
                                Across all subjects
                            </p>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <Card className="md:col-span-1">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <GraduationCap className="h-5 w-5" />
                                Active Tuitions
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {activeTuitions.map((tuition, i) => (
                                    <div
                                        key={i}
                                        className="border rounded-lg p-4"
                                    >
                                        <div className="flex justify-between items-center mb-2">
                                            <div>
                                                <h3 className="font-semibold">
                                                    {tuition.subject}
                                                </h3>
                                                <p className="text-sm text-muted-foreground">
                                                    Tutor: {tuition.tutor}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="space-y-1">
                                            <div className="flex justify-between text-sm">
                                                <span>Progress</span>
                                                <span>{tuition.progress}%</span>
                                            </div>
                                            <Progress
                                                value={tuition.progress}
                                                className="h-2"
                                            />
                                        </div>
                                        <p className="text-sm text-muted-foreground mt-2">
                                            Next: {tuition.nextClass}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Recent Activities */}
                    <Card className="md:col-span-1">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Activity className="h-5 w-5" />
                                Recent Activities
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ScrollArea className="h-[400px] pr-4">
                                <div className="space-y-4">
                                    {recentActivities.map((activity, i) => (
                                        <div
                                            key={i}
                                            className="flex items-start gap-4 border-b pb-4"
                                        >
                                            <div className="rounded-full p-2 bg-muted">
                                                <activity.icon className="h-4 w-4" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <p className="font-medium">
                                                            {activity.type}
                                                        </p>
                                                        <p className="text-sm text-muted-foreground">
                                                            {activity.subject}
                                                        </p>
                                                    </div>
                                                    <span className="text-xs text-muted-foreground">
                                                        {activity.time}
                                                    </span>
                                                </div>
                                                <p className="text-sm mt-1">
                                                    {activity.description}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </ScrollArea>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <LineChart className="h-5 w-5" />
                            Performance Analytics
                        </CardTitle>
                        <CardDescription>
                            Subject-wise performance breakdown
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {performanceMetrics.map((metric, i) => (
                                <div key={i} className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <h4 className="font-medium">
                                            {metric.subject}
                                        </h4>
                                    </div>
                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="space-y-1">
                                            <p className="text-sm text-muted-foreground">
                                                Attendance
                                            </p>
                                            <Progress
                                                value={metric.attendance}
                                                className="h-2"
                                            />
                                            <p className="text-sm text-right">
                                                {metric.attendance}%
                                            </p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-sm text-muted-foreground">
                                                Assignments
                                            </p>
                                            <Progress
                                                value={metric.assignments}
                                                className="h-2"
                                            />
                                            <p className="text-sm text-right">
                                                {metric.assignments}%
                                            </p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-sm text-muted-foreground">
                                                Quizzes
                                            </p>
                                            <Progress
                                                value={metric.quizzes}
                                                className="h-2"
                                            />
                                            <p className="text-sm text-right">
                                                {metric.quizzes}%
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
