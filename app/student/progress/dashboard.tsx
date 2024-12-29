"use client";

import React, { useState } from "react";
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    PieChart,
    Pie,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Cell,
} from "recharts";
import { Card } from "@/components/ui/card";
import {
    TrendingUp,
    Book,
    Clock,
    Award,
    Users,
    Calendar,
    GraduationCap,
} from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#8884d8",
    "#82ca9d",
];

// Helper functions
const calculateSubjectProgress = (tuitionDetails = []) => {
    if (!Array.isArray(tuitionDetails)) return [];

    // Use a Map to combine data for the same subjects
    const subjectMap = new Map();

    tuitionDetails.forEach((tuition) => {
        if (!tuition?.subjects) return;

        tuition.subjects.forEach((subject) => {
            if (!subject?.tasks) return;

            const existingSubject = subjectMap.get(subject.name);
            if (existingSubject) {
                // Combine data for existing subject
                subjectMap.set(subject.name, {
                    subject: subject.name,
                    progress: Math.round(
                        (existingSubject.progress + subject.progress) / 2
                    ), // Average progress
                    tasks: existingSubject.tasks + subject.tasks.length,
                    completed:
                        existingSubject.completed +
                        subject.tasks.filter(
                            (task) => task.status === "completed"
                        ).length,
                    tutors: [
                        ...new Set([
                            ...existingSubject.tutors,
                            tuition.tutor?.name || "Unknown",
                        ]),
                    ],
                });
            } else {
                // Add new subject
                subjectMap.set(subject.name, {
                    subject: subject.name,
                    progress: subject.progress || 0,
                    tasks: subject.tasks.length,
                    completed: subject.tasks.filter(
                        (task) => task.status === "completed"
                    ).length,
                    tutors: [tuition.tutor?.name || "Unknown"],
                });
            }
        });
    });

    return Array.from(subjectMap.values());
};

const calculateTaskCompletion = (tuitionDetails = []) => {
    if (!Array.isArray(tuitionDetails)) return [];

    const taskData = [];
    tuitionDetails.forEach((tuition) => {
        if (!tuition?.subjects) return;

        tuition.subjects.forEach((subject) => {
            if (!subject?.tasks) return;

            subject.tasks.forEach((task) => {
                if (task.submission?.date) {
                    taskData.push({
                        date: task.submission.date,
                        score: task.score || 0,
                        subject: subject.name,
                    });
                }
            });
        });
    });
    return taskData.sort((a, b) => new Date(a.date) - new Date(b.date));
};

const calculateStats = (subjectProgress, tuitionData) => {
    const allSubjects = [
        ...new Set(subjectProgress.map((item) => item.subject)),
    ];

    return {
        totalSubjects: allSubjects.length,
        averageProgress: subjectProgress.length
            ? Math.round(
                  subjectProgress.reduce(
                      (sum, item) => sum + item.progress,
                      0
                  ) / subjectProgress.length
              )
            : 0,
        totalTutors: Array.isArray(tuitionData)
            ? [...new Set(tuitionData.map((item) => item.tutor))].length
            : 0,
        totalTasks: subjectProgress.reduce((sum, item) => sum + item.tasks, 0),
    };
};

const Dashboard = ({ tuitionData = [], tuitionDetails = [] }) => {
    const [selectedSubject, setSelectedSubject] = useState("all");

    // Calculate data
    const subjectProgress = calculateSubjectProgress(tuitionDetails);
    const taskCompletionData = calculateTaskCompletion(tuitionDetails);
    const allSubjects = [
        ...new Set(subjectProgress.map((item) => item.subject)),
    ];
    const stats = calculateStats(subjectProgress, tuitionData);

    const filteredProgress =
        selectedSubject === "all"
            ? subjectProgress
            : subjectProgress.filter(
                  (item) => item.subject === selectedSubject
              );

    // Early return if no data
    if (!tuitionData.length || !tuitionDetails.length) {
        return (
            <div className="min-h-screen p-6 bg-gray-50 flex items-center justify-center">
                <Card className="p-6">
                    <h2 className="text-xl font-semibold text-center">
                        No data available
                    </h2>
                    <p className="text-gray-500 mt-2">
                        Please check back later or contact support.
                    </p>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-6">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold mb-2">
                        Academic Progress Dashboard
                    </h1>
                    <p className="text-gray-500">
                        Track your performance across all subjects
                    </p>
                </div>
                <Select
                    value={selectedSubject}
                    onValueChange={setSelectedSubject}
                >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Subjects</SelectItem>
                        {allSubjects.map((subject) => (
                            <SelectItem key={subject} value={subject}>
                                {subject}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <Card className="p-4">
                    <h3 className="text-lg font-semibold mb-4">
                        Subject Progress
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={filteredProgress}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="subject" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar
                                dataKey="progress"
                                fill="#8884d8"
                                name="Progress (%)"
                            />
                            <Bar
                                dataKey="completed"
                                fill="#82ca9d"
                                name="Completed Tasks"
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </Card>

                <Card className="p-4">
                    <h3 className="text-lg font-semibold mb-4">
                        Task Completion Timeline
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={taskCompletionData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            {allSubjects.map((subject, index) => (
                                <Line
                                    key={subject}
                                    type="monotone"
                                    dataKey="score"
                                    data={taskCompletionData.filter(
                                        (item) => item.subject === subject
                                    )}
                                    name={subject}
                                    stroke={COLORS[index % COLORS.length]}
                                    dot={true}
                                />
                            ))}
                        </LineChart>
                    </ResponsiveContainer>
                </Card>
            </div>

            {/* Subject Distribution */}
            {subjectProgress.length > 0 && (
                <Card className="p-4">
                    <h3 className="text-lg font-semibold mb-4">
                        Subject Distribution
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">
                        Distribution of total tasks across subjects. The
                        percentage shows the proportion of tasks for each
                        subject.
                    </p>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={subjectProgress}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="tasks"
                                    nameKey="subject"
                                    label={({ name, percent }) =>
                                        `${name} ${(percent * 100).toFixed(0)}%`
                                    }
                                >
                                    {subjectProgress.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={COLORS[index % COLORS.length]}
                                        />
                                    ))}
                                </Pie>
                                <Tooltip
                                    formatter={(value, name, props) => [
                                        `${value} tasks (${props.payload.completed} completed)`,
                                        name,
                                    ]}
                                />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>

                        <div className="p-4">
                            <h4 className="text-md font-semibold mb-3">
                                Subject Details
                            </h4>
                            <div className="space-y-3">
                                {subjectProgress.map((subject, index) => (
                                    <div
                                        key={subject.subject}
                                        className="flex items-center justify-between"
                                    >
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <div
                                                    className="w-3 h-3 rounded-full"
                                                    style={{
                                                        backgroundColor:
                                                            COLORS[
                                                                index %
                                                                    COLORS.length
                                                            ],
                                                    }}
                                                />
                                                <span className="font-medium">
                                                    {subject.subject}
                                                </span>
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                Tutors:{" "}
                                                {subject.tutors.join(", ")}
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-medium">
                                                {subject.tasks} Tasks
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {subject.completed} Completed (
                                                {Math.round(
                                                    (subject.completed /
                                                        subject.tasks) *
                                                        100
                                                )}
                                                %)
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </Card>
            )}
        </div>
    );
};

export default Dashboard;
