export interface Tuition {
    subjects: {
        name: string;
        totalTasks: number;
        completedTasks: number;
    }[];
    tutor: string;
    totalTasks: number;
    completedTasks: number;
    nextClass: string;
    duration: string;
}
