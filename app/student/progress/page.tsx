"use client";

import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, CartesianGrid, YAxis } from "recharts";
import { BookOpen, Clock, Trophy, Calendar, Star } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "hsl(var(--chart-1))",
    },
} satisfies ChartConfig;

const performanceData = [
    { week: "Week 1", score: 75 },
    { week: "Week 2", score: 82 },
    { week: "Week 3", score: 78 },
    { week: "Week 4", score: 85 },
    { week: "Week 5", score: 90 },
    { week: "Week 6", score: 88 },
];

export default function StudentProgress() {
    return (
        <div className="w-full space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Learning Progress</h1>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    Last updated: {new Date().toLocaleDateString()}
                </div>
            </div>

            <div className="grid grid-cols-4 gap-4">
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-primary/10 rounded-lg">
                                <Clock className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Total Hours
                                </p>
                                <p className="text-2xl font-bold">24.5</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-green-100 rounded-lg">
                                <BookOpen className="w-6 h-6 text-green-600" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Lessons Completed
                                </p>
                                <p className="text-2xl font-bold">18/25</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-yellow-100 rounded-lg">
                                <Trophy className="w-6 h-6 text-yellow-600" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Current Streak
                                </p>
                                <p className="text-2xl font-bold">5 days</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-blue-100 rounded-lg">
                                <Star className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Average Score
                                </p>
                                <p className="text-2xl font-bold">85%</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-12 gap-6">
                <PerformanceChart className="col-span-8" />

                <div className="col-span-4 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg font-semibold">
                                Course Progress
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div>
                                <div className="flex justify-between text-sm mb-2">
                                    <span>Mathematics</span>
                                    <span className="text-muted-foreground">
                                        72%
                                    </span>
                                </div>
                                <Progress value={72} className="h-2" />
                            </div>

                            <div>
                                <div className="flex justify-between text-sm mb-2">
                                    <span>Physics</span>
                                    <span className="text-muted-foreground">
                                        85%
                                    </span>
                                </div>
                                <Progress value={85} className="h-2" />
                            </div>

                            <div>
                                <div className="flex justify-between text-sm mb-2">
                                    <span>Chemistry</span>
                                    <span className="text-muted-foreground">
                                        60%
                                    </span>
                                </div>
                                <Progress value={60} className="h-2" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg font-semibold">
                                Recent Achievements
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-green-100 rounded-full">
                                        <Trophy className="w-4 h-4 text-green-600" />
                                    </div>
                                    <div>
                                        <p className="font-medium">
                                            Perfect Score
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            Achieved in Quiz #5
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-blue-100 rounded-full">
                                        <Star className="w-4 h-4 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="font-medium">
                                            5-Day Streak
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            Consistent Learning
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

function PerformanceChart({ className }: { className?: string }) {
    return (
        <Card className={className}>
            <CardHeader>
                <CardTitle className="text-lg font-semibold">
                    Recent Achievements
                </CardTitle>
            </CardHeader>
            <CardContent>
                <ChartContainer
                    className="h-[380px] w-full"
                    config={chartConfig}
                >
                    <LineChart
                        accessibilityLayer
                        data={performanceData}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis dataKey="week" tickLine={false} tickMargin={8} />
                        <YAxis
                            label={{
                                value: "Score",
                                angle: -90,
                                position: "insideLeft",
                                style: {
                                    textAnchor: "middle",
                                },
                            }}
                        />{" "}
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Line
                            dataKey="score"
                            type="natural"
                            stroke="var(--color-desktop)"
                            strokeWidth={2}
                            dot={{
                                fill: "var(--color-desktop)",
                            }}
                            activeDot={{
                                r: 6,
                            }}
                        />
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
