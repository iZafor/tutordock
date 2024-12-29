"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { tuitionDetailsMockData } from "@/lib/data";
import { calculateSubjectTaskCompletionData } from "@/lib/student-analytics-util";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import ComboBox from "../ui/combo-box";
import { DateRange } from "@/lib/types";
import DateRangeFilter from "../ui/date-range-filter";

const chartConfig = {
    totalTasks: {
        label: "Total tasks",
        color: "hsl(var(--chart-1))",
    },
    completedTasks: {
        label: "Completed",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig;

export default function StudentSubjectTaskCompletionBarChart({
    className,
}: {
    className?: string;
}) {
    const allSubjects = Array.from(
        new Set(
            tuitionDetailsMockData.flatMap((t) => t.subjects.map((s) => s.name))
        ).values()
    );

    const [selectedSubjects, setSelectedSubjects] = useState<string[]>(
        allSubjects.slice(0, 5)
    );
    const [dateRange, setDateRange] = useState<DateRange>({
        from: undefined,
        to: undefined,
    });

    const chartData = calculateSubjectTaskCompletionData(
        selectedSubjects,
        dateRange,
        tuitionDetailsMockData
    );

    return (
        <Card className={className}>
            <CardHeader>
                <CardTitle>Task Completion</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* filters */}
                <div className="w-full flex justify-between gap-4">
                    <ComboBox
                        className="flex-1"
                        name="subject"
                        values={allSubjects}
                        selectedValues={selectedSubjects}
                        onSelect={setSelectedSubjects}
                    />
                    <DateRangeFilter
                        className="flex-1"
                        dateRange={dateRange}
                        setDateRange={setDateRange}
                    />
                </div>

                {/* Progress Bar Chart */}
                <ChartContainer config={chartConfig}>
                    <BarChart accessibilityLayer data={chartData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="subject"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="dashed" />}
                        />
                        <Bar
                            dataKey="totalTasks"
                            fill="var(--color-totalTasks)"
                            radius={4}
                        />
                        <Bar
                            dataKey="completedTasks"
                            fill="var(--color-completedTasks)"
                            radius={4}
                        />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
