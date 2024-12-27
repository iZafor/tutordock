"use client";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import TuitionCard from "@/components/my-tuitions/tuition-card";
import { tuitionMockData } from "@/lib/data";
import { Input } from "@/components/ui/input";
import { useState } from "react";

type Progress = "all" | "inProgress" | "completed";
type Status = "all" | "on-going" | "discontinued";

export default function MyTuitions() {
    const [searchTerm, setSearchTerm] = useState("");
    const [progress, setProgress] = useState("");
    const [status, setStatus] = useState("");

    const filteredTuitions = tuitionMockData.filter((t) => {
        const lowerTerm = searchTerm.toLowerCase();
        const matchesSearchTerm =
            !lowerTerm ||
            t.subjects.some((s) => s.name.toLowerCase().includes(lowerTerm)) ||
            t.tutor!.toLowerCase().includes(lowerTerm);
        const matchesProgress =
            progress === "" ||
            progress === "all" ||
            (progress === "completed"
                ? t.completedTasks === t.totalTasks
                : t.completedTasks < t.totalTasks);
        const matchesStatus =
            status === "" || status === "all" || status === t.status;
        return matchesSearchTerm && matchesProgress && matchesStatus;
    });

    return (
        <div className="flex-1 space-y-6 mt-6">
            <div className="flex gap-4 flex-wrap">
                <div className="flex-1 min-w-[200px]">
                    <Input
                        value={searchTerm}
                        placeholder="Search subjects or tutors..."
                        className="w-full"
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <Select
                    value={progress}
                    onValueChange={(currProgress: Progress) =>
                        setProgress(currProgress)
                    }
                >
                    <SelectTrigger className="w-32">
                        <SelectValue placeholder="Progress" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="inProgress">In Progress</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                </Select>
                <Select
                    value={status}
                    onValueChange={(currStatus: Status) =>
                        setStatus(currStatus)
                    }
                >
                    <SelectTrigger className="w-32">
                        <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="on-going">On Going</SelectItem>
                        <SelectItem value="discontinued">
                            Discontinued
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTuitions.map((tuition) => (
                    <TuitionCard key={tuition.id} tuition={tuition} />
                ))}
            </div>
        </div>
    );
}
