import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Tuition } from "@/lib/types";
import { Progress } from "@/components/ui/progress";
import {
    BookOpen,
    CheckCircle2,
    Circle,
    GraduationCap,
    Calendar,
    ExternalLink,
    Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function TuitionCard({ tuition }: { tuition: Tuition }) {
    const overallProgress = Math.round(
        (tuition.subjects.reduce(
            (acc, subject) => acc + subject.completedTasks,
            0
        ) /
            tuition.subjects.reduce(
                (acc, subject) => acc + subject.totalTasks,
                0
            )) *
            100
    );
    const isCompleted = tuition.subjects.every(
        (subject) => subject.completedTasks === subject.totalTasks
    );
    const formatNextClass = (dateString: string) => {
        const date = new Date(dateString);
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        // Format time
        const timeString = date.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        });

        // If class is today
        if (date.toDateString() === today.toDateString()) {
            return `Today, ${timeString}`;
        }
        // If class is tomorrow
        if (date.toDateString() === tomorrow.toDateString()) {
            return `Tomorrow, ${timeString}`;
        }
        // Otherwise show date and time
        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        });
    };

    return (
        <Card className="w-full">
            <CardHeader className="space-y-1">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <BookOpen className="h-5 w-5 text-muted-foreground" />
                        <CardTitle className="text-xl">
                            {tuition.subjects
                                .map((subject) => subject.name)
                                .join(", ")}
                        </CardTitle>
                    </div>
                    {isCompleted ? (
                        <Badge
                            variant="success"
                            className="bg-green-100 text-green-800"
                        >
                            <CheckCircle2 className="h-3 w-3 mr-1" />
                            Completed
                        </Badge>
                    ) : (
                        <Badge variant="secondary">
                            <Circle className="h-3 w-3 mr-1" />
                            In Progress
                        </Badge>
                    )}
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <GraduationCap className="h-4 w-4" />
                    <span>{tuition.tutor}</span>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">
                            Overall Progress
                        </span>
                        <span className="text-sm text-muted-foreground">
                            {overallProgress}%
                        </span>
                    </div>
                    <Progress value={overallProgress} className="h-2" />

                    {tuition.subjects.map((subject, index) => (
                        <div key={index} className="space-y-1">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">
                                    {subject.name}
                                </span>
                                <span className="text-muted-foreground">
                                    {subject.completedTasks}/
                                    {subject.totalTasks} Tasks
                                </span>
                            </div>
                            <Progress
                                value={
                                    (subject.completedTasks /
                                        subject.totalTasks) *
                                    100
                                }
                                className="h-1"
                            />
                        </div>
                    ))}
                </div>

                <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>
                            Next Class: {formatNextClass(tuition.nextClass)}
                        </span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>Duration: {tuition.duration}</span>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex justify-end">
                <Button size="sm">
                    View Tuition
                    <ExternalLink className="h-4 w-4 ml-2" />
                </Button>
            </CardFooter>
        </Card>
    );
}
