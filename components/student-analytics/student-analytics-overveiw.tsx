import { Card } from "@/components/ui/card";
import { Book, ListTodo, Presentation, TrendingUp } from "lucide-react";
import { calculateOverviewData } from "@/lib/student-analytics-util";
import { tuitionDetailsMockData } from "@/lib/data";

export default function StudentAnalyticsOverview() {
    const { averageProgress, totalSubjects, totalTasks, totalTuitions } =
        calculateOverviewData(tuitionDetailsMockData);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card className="p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm text-muted-foreground">
                            Average Progress
                        </p>
                        <h3 className="text-2xl font-bold">
                            {averageProgress}%
                        </h3>
                    </div>
                    <TrendingUp className="h-8 w-8 text-blue-500" />
                </div>
            </Card>

            <Card className="p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm text-muted-foreground">
                            Total Subjects
                        </p>
                        <h3 className="text-2xl font-bold">{totalSubjects}</h3>
                    </div>
                    <Book className="h-8 w-8 text-green-500" />
                </div>
            </Card>

            <Card className="p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm text-muted-foreground">
                            Total Tuitions
                        </p>
                        <h3 className="text-2xl font-bold">{totalTuitions}</h3>
                    </div>
                    <Presentation className="h-8 w-8 text-yellow-500" />
                </div>
            </Card>

            <Card className="p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm text-muted-foreground">
                            Total Tasks
                        </p>
                        <h3 className="text-2xl font-bold">{totalTasks}</h3>
                    </div>
                    <ListTodo className="h-8 w-8 text-purple-500" />
                </div>
            </Card>
        </div>
    );
}
