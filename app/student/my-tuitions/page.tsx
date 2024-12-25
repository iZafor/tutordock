"use client";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import TuitionCard from "@/components/student/my-tuitions/tuition-card";
import { tuitionMockData } from "@/lib/data";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function MyTuitions() {
    const [tuitions, setTuitions] = useState(tuitionMockData);
    const [value, setValue] = useState("all");

    return (
        <div className="flex-1 space-y-6 mt-6">
            <div className="flex gap-4 flex-wrap">
                <div className="flex-1 min-w-[200px]">
                    <Input
                        placeholder="Search subjects or tutors..."
                        className="w-full"
                        onChange={(e) => {
                            setTimeout(() => {
                                const term = e.target.value.toLowerCase();
                                setTuitions((prev) =>
                                    !term
                                        ? tuitionMockData.slice()
                                        : prev.filter(
                                              (t) =>
                                                  t.subjects.some((s) =>
                                                      s.name
                                                          .toLowerCase()
                                                          .includes(term)
                                                  ) ||
                                                  t.tutor
                                                      .toLowerCase()
                                                      .includes(term)
                                          )
                                );
                                setValue((prev) => prev.slice());
                            }, 100);
                        }}
                    />
                </div>
                <Select
                    value={value}
                    onValueChange={(val) => {
                        setTuitions(
                            val === "all"
                                ? tuitionMockData.slice()
                                : val === "inProgress"
                                ? tuitionMockData.filter((t) =>
                                      t.subjects.every(
                                          (s) => s.completedTasks < s.totalTasks
                                      )
                                  )
                                : tuitionMockData.filter((t) =>
                                      t.subjects.every(
                                          (s) =>
                                              s.completedTasks === s.totalTasks
                                      )
                                  )
                        );
                        setValue(val);
                    }}
                >
                    <SelectTrigger className="w-32">
                        <SelectValue placeholder="Filter" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="inProgress">In Progress</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tuitions.map(tuition => (
                    <TuitionCard key={tuition.id} tuition={tuition} />
                ))}
            </div>
        </div>
    );
}
