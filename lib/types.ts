export interface Tuition {
    id: string;
    subjects: {
        name: string;
        totalTasks: number;
        completedTasks: number;
    }[];
    tutor: string;
    totalTasks: number;
    completedTasks: number;
    sessionDays: string[]
    duration: string;
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
    description: string;
    tasks: Task[];
    resources: Resource[];
    progress: number;
}

export interface TuitionDetails {
    id: string;
    subjects: Subject[];
    instructor: {
        name: string;
        bio: string;
        avatar: string;
    };
    sessionDays: string[];
    duration: string;
}
