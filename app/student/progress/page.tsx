import StudentAnalyticsOverview from "@/components/student-analytics/student-analytics-overveiw";
import StudentSubjectProgressBarChart from "@/components/student-analytics/student-subject-progress-bar-chart";
import StudentSubjectTaskCompletionBarChart from "@/components/student-analytics/student-subject-task-completion-bar-chart";

export default function AcademicProgress() {
    return (
        <div className="space-y-6 mt-6">
            <div>
                <h1 className="text-3xl font-bold mb-2">
                    Academic Progress Dashboard
                </h1>
                <p className="text-muted-foreground">
                    Track your performance across all subjects
                </p>
            </div>

            <StudentAnalyticsOverview />

            <div className="flex justify-between gap-4">
                <StudentSubjectProgressBarChart className="flex-1" />
                <StudentSubjectTaskCompletionBarChart className="flex-1" />
            </div>
        </div>
    );
}
