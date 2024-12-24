import { Tuition } from "./types";

export const tuitionMockData: Tuition[] = [
    {
        subjects: [
            {
                name: "Mathematics",
                totalTasks: 20,
                completedTasks: 15,
            },
            {
                name: "Physics",
                totalTasks: 15,
                completedTasks: 10,
            },
        ],
        tutor: "Dr. Smith",
        totalTasks: 20,
        completedTasks: 15,
        nextClass: "2024-12-26 14:00",
        duration: "2 hours",
    },
    {
        subjects: [
            {
                name: "Chemistry",
                totalTasks: 18,
                completedTasks: 8,
            },
            {
                name: "Biology",
                totalTasks: 15,
                completedTasks: 12,
            },
        ],
        tutor: "Prof. Johnson",
        totalTasks: 15,
        completedTasks: 8,
        nextClass: "2024-12-25 10:00",
        duration: "1.5 hours",
    },
    {
        subjects: [
            {
                name: "English",
                totalTasks: 18,
                completedTasks: 18,
            },
            {
                name: "Literature",
                totalTasks: 15,
                completedTasks: 15,
            },
            {
                name: "Mathematics",
                totalTasks: 20,
                completedTasks: 20,
            },
        ],
        tutor: "Dr. Williams",
        totalTasks: 18,
        completedTasks: 18,
        nextClass: "2024-12-27 15:30",
        duration: "2 hours",
    },
];
