import {
    DateRange,
    StudentAnalyticsOverviewData,
    StudentAnalyticsSubjectProgressData,
    StudentAnalyticsSubjectTaskCompletionData,
    Subject,
    TuitionDetails,
} from "./types";

export function calculateOverviewData(
    tuitions: TuitionDetails[]
): StudentAnalyticsOverviewData {
    const totalTuitions = tuitions.length;
    let totalTasks = 0;
    let totalProgress = 0;
    let totalCompletedTasks = 0;
    const subjects: { [key: string]: boolean } = {};

    tuitions.forEach((tuition) =>
        tuition.subjects.forEach((subject) => {
            subjects[subject.name] = true;
            totalTasks += subject.tasks.length;

            subject.tasks.forEach((task) => {
                if (task.status === "completed") {
                    totalCompletedTasks += 1;
                    totalProgress += (task.score! / task.maxPoints!) * 100;
                }
            });
        })
    );

    const totalSubjects = Object.keys(subjects).length;
    const averageProgress = Math.round(totalProgress / totalCompletedTasks);

    return {
        averageProgress,
        totalSubjects,
        totalTuitions,
        totalTasks,
    };
}

export function calculateSubjectTaskProgress(subject: Subject) {
    const assignedTasks = subject.tasks.length;
    const completedTasks = subject.tasks.filter(
        (task) => task.status === "completed"
    ).length;
    return Math.round((completedTasks / assignedTasks) * 100) || 0;
}

export function calculateSubjectProgressData(
    subjects: string[],
    dateRange: DateRange,
    tuitions: TuitionDetails[]
): StudentAnalyticsSubjectProgressData[] {
    const result: {
        [key: string]: {
            totalProgress: number;
            completedTasks: number;
        };
    } = {};

    tuitions.forEach((tuition) =>
        tuition.subjects.forEach((subject) => {
            const name = subject.name;
            if (subjects.includes(name)) {
                let progress = 0;
                let completedTasks = 0;

                subject.tasks.forEach((task) => {
                    if (task.status === "completed") {
                        if (
                            !dateRange.from ||
                            !dateRange.to ||
                            (new Date(task.submission!.date!) >=
                                dateRange.from &&
                                new Date(task.submission!.date!) <=
                                    dateRange.to)
                        ) {
                            completedTasks += 1;
                            progress += (task.score! / task.maxPoints!) * 100;
                        }
                    }
                });

                if (result[name]) {
                    result[name].completedTasks += completedTasks;
                    result[name].totalProgress += progress;
                } else {
                    result[name] = {
                        totalProgress: progress,
                        completedTasks: completedTasks,
                    };
                }
            }
        })
    );

    return Object.keys(result).map((s) => ({
        subject: s,
        overallProgress: Math.round(
            result[s].totalProgress / result[s].completedTasks || 0
        ),
    }));
}

export function calculateSubjectTaskCompletionData(
    subjects: string[],
    dateRange: DateRange,
    tuitions: TuitionDetails[]
): StudentAnalyticsSubjectTaskCompletionData[] {
    const result: {
        [key: string]: {
            totalTasks: number;
            completedTasks: number;
        };
    } = {};

    tuitions.forEach((tuition) =>
        tuition.subjects.forEach((subject) => {
            const name = subject.name;
            if (subjects.includes(name)) {
                const tasks = subject.tasks.length;
                let completedTasks = 0;

                subject.tasks.forEach((task) => {
                    if (task.status === "completed") {
                        if (
                            !dateRange.from ||
                            !dateRange.to ||
                            (new Date(task.submission!.date!) >=
                                dateRange.from &&
                                new Date(task.submission!.date!) <=
                                    dateRange.to)
                        ) {
                            completedTasks += 1;
                        }
                    }
                });

                if (result[name]) {
                    result[name].totalTasks += tasks;
                    result[name].completedTasks += completedTasks;
                } else {
                    result[name] = {
                        totalTasks: tasks,
                        completedTasks: completedTasks,
                    };
                }
            }
        })
    );

    return Object.keys(result).map((s) => ({
        subject: s,
        ...result[s],
    }));
}
