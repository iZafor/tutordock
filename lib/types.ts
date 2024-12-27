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
        file?: string;
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
    progress: number;
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

export interface TuitionOffer {
    offerId: string;
    budget: {
        amount: number;
        rateType: "hour" | "month" | "week";
    };
    startDate: string;
    subjects: string[];
    schedule: Schedule;
    mode: "online" | "in-person" | "hybrid";
    status: "pending" | "accepted" | "rejected" | "expired";
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
