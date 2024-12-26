"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tuition } from "@/lib/types";
import { Progress } from "@/components/ui/progress";
import {
    BookOpen,
    GraduationCap,
    Calendar,
    Clock,
    ExternalLink,
    Presentation,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getNextClassDateText } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";

export default function TuitionCard({ tuition }: { tuition: Tuition }) {
    const pathname = usePathname();
    const router = useRouter();

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

    return (
        <Card className="w-full hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="pb-4">
                <div className="space-y-3">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                            <BookOpen className="h-5 w-5 text-primary" />
                            <h3 className="font-semibold text-lg">
                                {tuition.subjects.length > 2
                                    ? `${tuition.subjects[0].name} +${
                                          tuition.subjects.length - 1
                                      } more`
                                    : tuition.subjects
                                          .map((subject) => subject.name)
                                          .join(", ")}
                            </h3>
                        </div>
                        <div className="flex gap-2">
                            <Badge
                                variant={isCompleted ? "success" : "secondary"}
                            >
                                {isCompleted ? "Completed" : "In Progress"}
                            </Badge>
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() =>
                                    router.push(`${pathname}/${tuition.id}`)
                                }
                            >
                                <ExternalLink />
                            </Button>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        {tuition.student ? (
                            <GraduationCap className="h-4 w-4" />
                        ) : (
                            <Presentation className="h-4 w-4" />
                        )}
                        <span>{tuition.tutor || tuition.student}</span>
                    </div>
                    <div className="w-full flex items-center justify-between gap-4 text-sm">
                        <div className="flex items-center space-x-2 text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            <span>
                                Next:{" "}
                                {getNextClassDateText(tuition.sessionDays)}
                            </span>
                        </div>
                        <div className="flex items-center space-x-2 text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            <span>
                                {tuition.duration +
                                    `(${tuition.from} to ${tuition.to})`}
                            </span>
                        </div>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="space-y-6">
                <div className="space-y-4">
                    <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                            <span className="font-medium">
                                Overall Progress
                            </span>
                            <span className="text-muted-foreground font-medium">
                                {overallProgress}%
                            </span>
                        </div>
                        <Progress value={overallProgress} className="h-2" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {tuition.subjects.map((subject, index) => (
                            <div
                                key={index}
                                className="space-y-2 bg-muted/30 p-3 rounded-lg"
                            >
                                <div className="flex items-center justify-between text-sm">
                                    <span className="font-medium">
                                        {subject.name}
                                    </span>
                                    <span className="text-muted-foreground">
                                        {Math.round(
                                            (subject.completedTasks /
                                                subject.totalTasks) *
                                                100
                                        )}
                                        %
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
                                <div className="text-xs text-muted-foreground">
                                    {subject.completedTasks}/
                                    {subject.totalTasks} Tasks
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
