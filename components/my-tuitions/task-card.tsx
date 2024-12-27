"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Task } from "@/lib/types";
import {
    Collapsible,
    CollapsibleTrigger,
    CollapsibleContent,
} from "@/components/ui/collapsible";
import {
    Calendar,
    Clock,
    ChevronUp,
    ChevronDown,
    Upload,
    Trophy,
    Pencil,
    Download,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

export default function TaskCard({ task }: { task: Task }) {
    const [isOpen, setIsOpen] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [score, setScore] = useState<number | undefined>(task.score);
    const [isEditingScore, setIsEditingScore] = useState(false);
    const [tempScore, setTempScore] = useState<number | undefined>(score);
    const scoreEditorRef = useRef<HTMLDivElement>(null);
    const isStudent = usePathname().includes("/student");

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                scoreEditorRef.current &&
                !scoreEditorRef.current.contains(event.target as Node)
            ) {
                setIsEditingScore(false);
                setTempScore(score);
            }
        };

        if (isEditingScore) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isEditingScore, score]);

    const getStatusBadge = (status: Task["status"]) => {
        switch (status) {
            case "completed":
                return <Badge variant="success">Completed</Badge>;
            case "pending":
                return <Badge variant="secondary">Pending</Badge>;
            case "overdue":
                return <Badge variant="destructive">Overdue</Badge>;
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = () => {
        console.log("Submitting task:", task.id, "with file:", file);
    };

    const handleScoreSubmit = (newScore: number) => {
        if (newScore >= 0 && newScore <= (task.maxPoints || 0)) {
            setScore(newScore);
            setTempScore(newScore);
            setIsEditingScore(false);
            console.log(
                "Updating score for task:",
                task.id,
                "new score:",
                newScore
            );
        }
    };

    const ScoreDisplay = () => {
        if (!task.maxPoints) return null;

        if (isStudent) {
            return (
                <div className="flex items-center text-sm text-muted-foreground bg-secondary/30 px-2 py-1 rounded-md">
                    <Trophy className="size-4 mr-1.5" />
                    {score !== undefined ? (
                        <span>
                            {score}/{task.maxPoints} pts
                        </span>
                    ) : (
                        <span>{task.maxPoints} pts</span>
                    )}
                </div>
            );
        }

        if (isEditingScore) {
            return (
                <div
                    ref={scoreEditorRef}
                    className="flex items-center gap-2 bg-secondary/30 px-2 py-1 rounded-md"
                    onClick={(e) => e.stopPropagation()}
                >
                    <Trophy className="size-4" />
                    <Input
                        type="number"
                        min={0}
                        max={task.maxPoints}
                        value={tempScore ?? ""}
                        onChange={(e) => setTempScore(Number(e.target.value))}
                        className="w-16 h-7 text-sm"
                        autoFocus
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleScoreSubmit(tempScore || 0);
                            } else if (e.key === "Escape") {
                                setIsEditingScore(false);
                                setTempScore(score);
                            }
                        }}
                    />
                    <span className="text-sm text-muted-foreground">
                        /{task.maxPoints}
                    </span>
                    <Button
                        size="sm"
                        variant="ghost"
                        className="h-7 px-2"
                        onClick={() => handleScoreSubmit(tempScore || 0)}
                    >
                        Save
                    </Button>
                </div>
            );
        }

        return (
            <div
                className="flex items-center text-sm text-muted-foreground bg-secondary/30 px-2 py-1 rounded-md cursor-pointer group"
                onClick={(e) => {
                    e.stopPropagation();
                    setIsEditingScore(true);
                    setTempScore(score);
                }}
            >
                <Trophy className="size-4 mr-1.5" />
                <span>
                    {score !== undefined
                        ? `${score}/${task.maxPoints}`
                        : `${task.maxPoints}`}{" "}
                    pts
                </span>
                <Pencil className="size-3 ml-1.5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
        );
    };

    const SubmissionSection = () => {
        if (task.submission?.status === "submitted" && task.submission.file) {
            return (
                <div className="space-y-2">
                    <h4 className="font-semibold">Submission</h4>
                    <div className="flex items-center space-x-2">
                        <Button variant="outline" asChild className="max-w-md">
                            <a
                                href={task.submission.file.url}
                                download={task.submission.file.name}
                                className="flex items-center"
                            >
                                <Download className="size-4 mr-2" />
                                {task.submission.file.name}
                            </a>
                        </Button>
                        <span className="text-sm text-muted-foreground">
                            Submitted on{" "}
                            {new Date(
                                task.submission.date!
                            ).toLocaleDateString()}
                        </span>
                    </div>
                </div>
            );
        }

        if (isStudent && task.status !== "completed") {
            return (
                <div className="space-y-2">
                    <h4 className="font-semibold">Submit Your Work</h4>
                    <div className="flex items-center space-x-2">
                        <Input
                            type="file"
                            onChange={handleFileChange}
                            className="max-w-md"
                        />
                        <Button onClick={handleSubmit} disabled={!file}>
                            <Upload className="size-4 mr-2" />
                            Submit
                        </Button>
                    </div>
                </div>
            );
        }

        return null;
    };

    return (
        <Card className="mb-4">
            <Collapsible open={isOpen} onOpenChange={setIsOpen}>
                <CollapsibleTrigger className="w-full" asChild>
                    <CardHeader className="flex flex-row items-center justify-between p-4">
                        <div className="flex items-center space-x-4">
                            <div className="flex flex-col items-start">
                                <div className="flex items-center gap-3">
                                    <CardTitle className="text-lg">
                                        {task.title}
                                    </CardTitle>
                                    <ScoreDisplay />
                                </div>
                                <div className="flex items-center space-x-2 text-sm text-muted-foreground mt-1">
                                    <Calendar className="size-4" />
                                    <span>
                                        Assigned:{" "}
                                        {new Date(
                                            task.assignedDate
                                        ).toLocaleDateString()}
                                    </span>
                                    <Clock className="size-4 ml-2" />
                                    <span>
                                        Due:{" "}
                                        {new Date(
                                            task.dueDate
                                        ).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            {getStatusBadge(task.status)}
                            {isOpen ? (
                                <ChevronUp className="size-4" />
                            ) : (
                                <ChevronDown className="size-4" />
                            )}
                        </div>
                    </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                    <CardContent className="p-4 pt-0">
                        <div className="space-y-4">
                            <div>
                                <h4 className="font-semibold mb-2">
                                    Description
                                </h4>
                                <p className="text-muted-foreground">
                                    {task.description}
                                </p>
                            </div>
                            <SubmissionSection />
                        </div>
                    </CardContent>
                </CollapsibleContent>
            </Collapsible>
        </Card>
    );
}
