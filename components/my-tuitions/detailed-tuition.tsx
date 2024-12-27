"use client";

import { useState } from "react";
import {
    Calendar,
    CalendarDays,
    Clock,
    GraduationCap,
    Presentation,
} from "lucide-react";
import {
    tuitionDetailsMockData,
    tuitionDetailsMockDataForTutor,
} from "@/lib/data";
import SidebarSubjectItem from "@/components/my-tuitions/sidebar-subject-item";
import SubjectContent from "@/components/my-tuitions/subject-content";
import { Subject, TuitionDetails } from "@/lib/types";
import { getNextClassDateText } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

export default function DetailedTuition({ tuitionId }: { tuitionId: string }) {
    const isStudent = usePathname().includes("/student");
    const tuition = (
        isStudent ? tuitionDetailsMockData : tuitionDetailsMockDataForTutor
    ).find((t) => t.id === tuitionId) as TuitionDetails;
    const [selectedSubject, setSelectedSubject] = useState(tuition.subjects[0]);

    return (
        <div className="w-full flex h-screen bg-background">
            {/* Sidebar */}
            <div className="w-80 border-r bg-card py-6 pr-6 space-y-6">
                <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                        {isStudent ? (
                            <Presentation className="size-6" />
                        ) : (
                            <GraduationCap className="size-6" />
                        )}
                        <h2 className="text-2xl font-bold">
                            {isStudent
                                ? tuition.tutor?.name
                                : tuition.student?.name}
                        </h2>
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <CalendarDays className="h-4 w-4" />
                        <span>
                            Session Days: {tuition.sessionDays.join(", ")}
                        </span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>
                            Next: {getNextClassDateText(tuition.sessionDays)}
                        </span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>
                            {" "}
                            {tuition.duration +
                                `(${tuition.from} to ${tuition.to})`}
                        </span>
                    </div>
                </div>

                <Button variant="destructive" className="w-full">
                    Discontinue
                </Button>

                <div className="space-y-1">
                    <div className="text-sm font-medium">Subjects</div>
                    {tuition.subjects.map((subject: Subject) => (
                        <SidebarSubjectItem
                            key={subject.id}
                            subject={subject}
                            isActive={selectedSubject.id === subject.id}
                            onClick={() => setSelectedSubject(subject)}
                        />
                    ))}
                </div>
            </div>

            {/* Main Content */}
            <SubjectContent subject={selectedSubject} />
        </div>
    );
}
