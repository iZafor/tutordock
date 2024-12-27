import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Task } from "@/lib/types";
import {
    Collapsible,
    CollapsibleTrigger,
    CollapsibleContent,
} from "@radix-ui/react-collapsible";
import { Calendar, Clock, ChevronUp, ChevronDown, Upload } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

export default function TaskCard({ task }: { task: Task }) {
    const [isOpen, setIsOpen] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const isStudent = usePathname().includes("/student");

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

    return (
        <Card className="mb-4">
            <Collapsible open={isOpen} onOpenChange={setIsOpen}>
                <CollapsibleTrigger className="w-full">
                    <CardHeader className="flex flex-row items-center justify-between p-4">
                        <div className="flex items-center space-x-4">
                            <div className="flex flex-col items-start">
                                <CardTitle className="text-lg">
                                    {task.title}
                                </CardTitle>
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
                            {isStudent && task.status !== "completed" && (
                                <div className="space-y-2">
                                    <h4 className="font-semibold">
                                        Submit Your Work
                                    </h4>
                                    <div className="flex items-center space-x-2">
                                        <Input
                                            type="file"
                                            onChange={handleFileChange}
                                            className="max-w-md"
                                        />
                                        <Button
                                            onClick={handleSubmit}
                                            disabled={!file}
                                        >
                                            <Upload className="size-4 mr-2" />
                                            Submit
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </CollapsibleContent>
            </Collapsible>
        </Card>
    );
}
