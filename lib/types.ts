export interface Tuition {
    id: string;
    subjects: {
        name: string;
        totalTasks: number;
        completedTasks: number;
    }[];
    tutor?: string;
    student?: string;
    grade?: string;
    totalTasks: number;
    completedTasks: number;
    sessionDays: string[];
    from: string;
    to: string;
    duration: string;
    startDate?: string;
    endDate?: string;
    status: "on-going" | "discontinued";
}

export interface Task {
    id: string;
    title: string;
    assignedDate: string;
    dueDate: string;
    status: "completed" | "pending" | "overdue";
    description: string;
    submission?: {
        status: "submitted" | "draft" | null;
        date?: string;
        file?: {
            name: string;
            url: string;
        };
    };
    maxPoints?: number;
    score?: number;
}

export interface Resource {
    id: string;
    name: string;
    type: "document" | "video" | "link";
    url: string;
    dateAdded: string;
}

export interface Subject {
    id: string;
    name: string;
    tasks: Task[];
    resources: Resource[];
}

export interface TuitionDetails {
    id: string;
    subjects: Subject[];
    tutor?: {
        name: string;
        bio: string;
        avatar: string;
    };
    student?: {
        name: string;
        bio: string;
        avatar: string;
    };
    sessionDays: string[];
    from: string;
    to: string;
    duration: string;
}

export interface Schedule {
    weekdays: string[];
    startTime: string;
    endTime: string;
}

export interface StudentInfo {
    name: string;
    grade: string;
    rating: string;
    address: string;
}

export interface Budget {
    amount: number;
    rateType: "hour" | "month" | "week";
}

export type TuitionMode = "online" | "in-person" | "hybrid";

export interface TuitionOffer {
    offerId: string;
    student?: StudentInfo;
    budget: Budget;
    preferredBudget?: Budget;
    startDate: string;
    applicationDate?: string;
    acceptedDate?: string;
    rejectedDate?: string;
    subjects: string[];
    schedule: Schedule;
    preferredSchedule?: Schedule;
    mode: TuitionMode;
    preferredMode?: TuitionMode;
    status?: "pending" | "accepted" | "rejected";
}

export interface TuitionApplication {
    offerId: string;
    applicationId: string;
    tutor: string;
    rating: number;
    experience: string;
    applicationDate: string;
    status: "accepted" | "rejected" | "shortlisted" | "pending";
    message: string;
    expectedBudget?: {
        amount: number;
        rateType: "hour" | "month" | "week";
    };
    totalTuitions: number;
    specialization: string[];
    preferredSchedule?: Schedule;
    preferredMode?: "online" | "in-person" | "hybrid";
}

export interface StudentAnalyticsOverviewData {
    averageProgress: number;
    totalSubjects: number;
    totalTuitions: number;
    totalTasks: number;
}

export interface StudentAnalyticsSubjectProgressData {
    subject: string;
    overallProgress: number;
}

export interface StudentAnalyticsSubjectTaskCompletionData {
    subject: string;
    totalTasks: number;
    completedTasks: number;
}

export interface DateRange {
    from: Date | undefined;
    to: Date | undefined;
}
