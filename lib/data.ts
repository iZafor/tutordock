import {
    Tuition,
    TuitionApplication,
    TuitionDetails,
    TuitionOffer,
} from "./types";

export const tuitionMockData: Tuition[] = [
    {
        id: "tuition-1",
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
        sessionDays: ["Monday", "Wednesday"],
        from: "10:00 AM",
        to: "12:00 PM",
        duration: "2 hours",
        status: "on-going",
    },
    {
        id: "tuition-2",
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
        sessionDays: ["Sunday", "Tuesday"],
        from: "1:00 PM",
        to: "2:30 PM",
        duration: "1.5 hours",
        status: "on-going",
    },
    {
        id: "tuition-3",
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
        sessionDays: ["Friday", "Saturday"],
        from: "4:00 PM",
        to: "6:00 PM",
        duration: "2 hours",
        status: "on-going",
    },
];

export const tuitionDetailsMockData: TuitionDetails[] = [
    {
        id: "tuition-1",
        subjects: [
            {
                id: "math-101",
                name: "Mathematics",
                description:
                    "Advanced calculus and algebraic concepts for high school students",
                progress: 75,
                tasks: [
                    {
                        id: "task-math-1",
                        title: "Differential Equations Assignment",
                        assignedDate: "2024-12-20",
                        dueDate: "2024-12-27",
                        status: "pending",
                        description:
                            "Complete problems 1-10 from Chapter 5 on differential equations",
                        submission: {
                            status: "draft",
                            date: "2024-12-24",
                        },
                    },
                    {
                        id: "task-math-2",
                        title: "Linear Algebra Quiz",
                        assignedDate: "2024-12-15",
                        dueDate: "2024-12-22",
                        status: "completed",
                        description:
                            "Online quiz covering matrices and vector spaces",
                        submission: {
                            status: "submitted",
                            date: "2024-12-21",
                        },
                    },
                ],
                resources: [
                    {
                        id: "resource-math-1",
                        name: "Calculus Fundamentals",
                        type: "document",
                        url: "/resources/calculus-fundamentals.pdf",
                        dateAdded: "2024-12-01",
                    },
                    {
                        id: "resource-math-2",
                        name: "Khan Academy - Linear Algebra",
                        type: "video",
                        url: "https://khanacademy.org/linear-algebra",
                        dateAdded: "2024-12-05",
                    },
                ],
            },
            {
                id: "physics-101",
                name: "Physics",
                description:
                    "Fundamental physics concepts including mechanics and thermodynamics",
                progress: 67,
                tasks: [
                    {
                        id: "task-physics-1",
                        title: "Newton's Laws Lab Report",
                        assignedDate: "2024-12-18",
                        dueDate: "2024-12-25",
                        status: "pending",
                        description:
                            "Write a detailed lab report on the Newton's Laws experiments",
                        submission: {
                            status: "draft",
                        },
                    },
                    {
                        id: "task-physics-2",
                        title: "Thermodynamics Problem Set",
                        assignedDate: "2024-12-10",
                        dueDate: "2024-12-17",
                        status: "completed",
                        description:
                            "Solve problems related to heat transfer and thermal equilibrium",
                        submission: {
                            status: "submitted",
                            date: "2024-12-16",
                        },
                    },
                ],
                resources: [
                    {
                        id: "resource-physics-1",
                        name: "Physics Formula Sheet",
                        type: "document",
                        url: "/resources/physics-formulas.pdf",
                        dateAdded: "2024-12-01",
                    },
                    {
                        id: "resource-physics-2",
                        name: "Virtual Physics Lab",
                        type: "link",
                        url: "https://virtualphysicslab.com",
                        dateAdded: "2024-12-10",
                    },
                ],
            },
        ],
        tutor: {
            name: "Dr. Smith",
            bio: "PhD in Applied Mathematics with 10+ years of teaching experience. Specializes in making complex concepts accessible to students.",
            avatar: "/avatars/dr-smith.jpg",
        },
        sessionDays: ["Monday", "Wednesday"],
        from: "10:00 AM",
        to: "12:00 PM",
        duration: "2 hours",
    },
    {
        id: "tuition-2",
        subjects: [
            {
                id: "chem-101",
                name: "Chemistry",
                description:
                    "Comprehensive study of organic and inorganic chemistry",
                progress: 44,
                tasks: [
                    {
                        id: "task-chem-1",
                        title: "Organic Chemistry Report",
                        assignedDate: "2024-12-19",
                        dueDate: "2024-12-26",
                        status: "pending",
                        description:
                            "Write a report on organic compound reactions",
                        submission: {
                            status: "draft",
                        },
                    },
                    {
                        id: "task-chem-2",
                        title: "Periodic Table Quiz",
                        assignedDate: "2024-12-12",
                        dueDate: "2024-12-19",
                        status: "overdue",
                        description:
                            "Complete the online quiz about periodic table elements",
                        submission: undefined,
                    },
                ],
                resources: [
                    {
                        id: "resource-chem-1",
                        name: "Chemistry Lab Manual",
                        type: "document",
                        url: "/resources/chem-lab-manual.pdf",
                        dateAdded: "2024-12-01",
                    },
                    {
                        id: "resource-chem-2",
                        name: "Chemical Reactions Virtual Lab",
                        type: "link",
                        url: "https://virtualchemlab.com",
                        dateAdded: "2024-12-08",
                    },
                ],
            },
            {
                id: "bio-101",
                name: "Biology",
                description: "Study of life processes and living organisms",
                progress: 80,
                tasks: [
                    {
                        id: "task-bio-1",
                        title: "Cell Structure Assignment",
                        assignedDate: "2024-12-20",
                        dueDate: "2024-12-27",
                        status: "pending",
                        description:
                            "Complete the worksheet on cell structures and functions",
                        submission: {
                            status: "draft",
                        },
                    },
                    {
                        id: "task-bio-2",
                        title: "Genetics Project",
                        assignedDate: "2024-12-13",
                        dueDate: "2024-12-20",
                        status: "completed",
                        description:
                            "Research project on genetic inheritance patterns",
                        submission: {
                            status: "submitted",
                            date: "2024-12-19",
                        },
                    },
                ],
                resources: [
                    {
                        id: "resource-bio-1",
                        name: "Biology Textbook",
                        type: "document",
                        url: "/resources/biology-textbook.pdf",
                        dateAdded: "2024-12-01",
                    },
                    {
                        id: "resource-bio-2",
                        name: "Cell Division Animation",
                        type: "video",
                        url: "/resources/cell-division.mp4",
                        dateAdded: "2024-12-15",
                    },
                ],
            },
        ],
        tutor: {
            name: "Prof. Johnson",
            bio: "Professor of Chemistry with expertise in both organic and inorganic chemistry. Published researcher with passion for teaching.",
            avatar: "/avatars/prof-johnson.jpg",
        },
        sessionDays: ["Sunday", "Tuesday"],
        from: "1:00 PM",
        to: "2:30 PM",
        duration: "1.5 hours",
    },
    {
        id: "tuition-3",
        subjects: [
            {
                id: "eng-101",
                name: "English",
                description:
                    "Advanced English language and composition studies",
                progress: 100,
                tasks: [
                    {
                        id: "task-eng-1",
                        title: "Essay Writing",
                        assignedDate: "2024-12-15",
                        dueDate: "2024-12-22",
                        status: "completed",
                        description: "Write a 1000-word analytical essay",
                        submission: {
                            status: "submitted",
                            date: "2024-12-21",
                        },
                    },
                    {
                        id: "task-eng-2",
                        title: "Grammar Assessment",
                        assignedDate: "2024-12-10",
                        dueDate: "2024-12-17",
                        status: "completed",
                        description: "Complete the online grammar assessment",
                        submission: {
                            status: "submitted",
                            date: "2024-12-16",
                        },
                    },
                ],
                resources: [
                    {
                        id: "resource-eng-1",
                        name: "Writing Style Guide",
                        type: "document",
                        url: "/resources/style-guide.pdf",
                        dateAdded: "2024-12-01",
                    },
                    {
                        id: "resource-eng-2",
                        name: "Grammar Tutorial Series",
                        type: "video",
                        url: "/resources/grammar-tutorials",
                        dateAdded: "2024-12-05",
                    },
                ],
            },
            {
                id: "lit-101",
                name: "Literature",
                description:
                    "Analysis of classical and contemporary literature",
                progress: 100,
                tasks: [
                    {
                        id: "task-lit-1",
                        title: "Shakespeare Analysis",
                        assignedDate: "2024-12-18",
                        dueDate: "2024-12-25",
                        status: "completed",
                        description: "Analyze the themes in Macbeth",
                        submission: {
                            status: "submitted",
                            date: "2024-12-24",
                        },
                    },
                ],
                resources: [
                    {
                        id: "resource-lit-1",
                        name: "Literary Terms Glossary",
                        type: "document",
                        url: "/resources/literary-terms.pdf",
                        dateAdded: "2024-12-01",
                    },
                    {
                        id: "resource-lit-2",
                        name: "Shakespeare Online Library",
                        type: "link",
                        url: "https://shakespeare-online.com",
                        dateAdded: "2024-12-10",
                    },
                ],
            },
            {
                id: "math-102",
                name: "Mathematics",
                description:
                    "Advanced mathematical concepts and problem-solving",
                progress: 100,
                tasks: [
                    {
                        id: "task-math-3",
                        title: "Calculus Final",
                        assignedDate: "2024-12-10",
                        dueDate: "2024-12-17",
                        status: "completed",
                        description:
                            "Final assessment covering all calculus topics",
                        submission: {
                            status: "submitted",
                            date: "2024-12-16",
                        },
                    },
                ],
                resources: [
                    {
                        id: "resource-math-3",
                        name: "Advanced Math Formula Sheet",
                        type: "document",
                        url: "/resources/advanced-math-formulas.pdf",
                        dateAdded: "2024-12-01",
                    },
                ],
            },
        ],
        tutor: {
            name: "Dr. Williams",
            bio: "Experienced educator with dual expertise in English Literature and Mathematics. Known for innovative teaching methods.",
            avatar: "/avatars/dr-williams.jpg",
        },
        sessionDays: ["Friday", "Saturday"],
        from: "4:00 PM",
        to: "6:00 PM",
        duration: "2 hours",
    },
];

export const tuitionOfferMockData: TuitionOffer[] = [
    {
        offerId: "TO-2024-001",
        budget: {
            amount: 50,
            rateType: "hour",
        },
        startDate: "2025-01-15",
        subjects: ["Mathematics", "Physics"],
        schedule: {
            weekdays: ["Monday", "Wednesday", "Friday"],
            startTime: "10:00",
            endTime: "12:00",
        },
        mode: "online",
        status: "pending",
    },
    {
        offerId: "TO-2024-002",
        budget: {
            amount: 400,
            rateType: "month",
        },
        startDate: "2025-01-20",
        subjects: ["Physics", "Bangla Literature"],
        schedule: {
            weekdays: ["Tuesday", "Thursday"],
            startTime: "14:00",
            endTime: "16:00",
        },
        mode: "hybrid",
        status: "accepted",
    },
];

export const tuitionApplicationMockData: TuitionApplication[] = [
    {
        offerId: "TO-2024-001",
        applicationId: "APP-001-001",
        tutor: "John Smith",
        rating: 4.8,
        experience: "5 years",
        applicationDate: "2024-12-20",
        status: "pending",
        message:
            "I have extensive experience teaching both Mathematics and Physics at high school level. My students consistently achieve A grades in their exams.",
        expectedBudget: {
            amount: 60,
            rateType: "hour",
        },
        totalTuitions: 45,
        specialization: ["AP Physics", "IB Mathematics", "SAT Math Level 2"],
        preferredSchedule: {
            weekdays: ["Monday", "Wednesday"],
            startTime: "10:00",
            endTime: "12:00",
        },
        preferredMode: "online",
    },
    {
        offerId: "TO-2024-001",
        applicationId: "APP-001-002",
        tutor: "Sarah Johnson",
        rating: 4.9,
        experience: "7 years",
        applicationDate: "2024-12-21",
        status: "shortlisted",
        message:
            "I specialize in online tutoring and have helped many students excel in Physics. I can adapt my teaching style to match student needs.",
        expectedBudget: {
            amount: 70,
            rateType: "hour",
        },
        totalTuitions: 78,
        specialization: [
            "SAT Math",
            "Advanced Physics",
            "Competitive Mathematics",
        ],
        preferredSchedule: {
            weekdays: ["Monday", "Wednesday", "Friday"],
            startTime: "10:00",
            endTime: "12:00",
        },
        preferredMode: "online",
    },
    {
        offerId: "TO-2024-001",
        applicationId: "APP-001-003",
        tutor: "Michael Chen",
        rating: 4.7,
        experience: "4 years",
        applicationDate: "2024-12-22",
        status: "pending",
        message:
            "I hold a Masters in Physics and have experience teaching both online and in-person. I focus on building strong fundamentals.",
        expectedBudget: {
            amount: 50,
            rateType: "hour",
        },
        totalTuitions: 32,
        specialization: ["Physics", "Calculus", "Mechanics"],
        preferredSchedule: {
            weekdays: ["Monday", "Wednesday", "Friday"],
            startTime: "11:00",
            endTime: "13:00",
        },
        preferredMode: "online",
    },
    {
        offerId: "TO-2024-002",
        applicationId: "APP-002-001",
        tutor: "Rahima Khan",
        rating: 4.9,
        experience: "8 years",
        applicationDate: "2024-12-20",
        status: "accepted",
        message:
            "I am a published author in Bangla Literature and have been teaching Physics for 8 years. I can provide comprehensive coverage of both subjects.",
        expectedBudget: {
            amount: 4000,
            rateType: "month",
        },
        totalTuitions: 92,
        specialization: ["Bangla Literature", "Creative Writing", "Physics"],
        preferredSchedule: {
            weekdays: ["Tuesday", "Thursday"],
            startTime: "14:00",
            endTime: "16:00",
        },
        preferredMode: "hybrid",
    },
    {
        offerId: "TO-2024-002",
        applicationId: "APP-002-002",
        tutor: "Anik Rahman",
        rating: 4.6,
        experience: "6 years",
        applicationDate: "2024-12-21",
        status: "rejected",
        message:
            "I have experience teaching both Physics and Bangla Literature. I use interactive teaching methods and real-world examples.",
        totalTuitions: 55,
        specialization: [
            "Modern Bangla Literature",
            "Physics",
            "Science Communication",
        ],
        preferredSchedule: {
            weekdays: ["Tuesday", "Thursday"],
            startTime: "15:00",
            endTime: "17:00",
        },
        preferredMode: "in-person",
    },
    {
        offerId: "TO-2024-002",
        applicationId: "APP-002-003",
        tutor: "Fahmida Akter",
        rating: 4.8,
        experience: "5 years",
        applicationDate: "2024-12-22",
        status: "pending",
        message:
            "I specialize in making complex Physics concepts easy to understand and have a deep passion for Bangla Literature.",
        totalTuitions: 48,
        specialization: [
            "Classical Bangla Literature",
            "Modern Physics",
            "Academic Writing",
        ],
        preferredSchedule: {
            weekdays: ["Tuesday", "Thursday"],
            startTime: "14:00",
            endTime: "16:00",
        },
        preferredMode: "hybrid",
    },
];

export const tuitionMockDataForTutor: Tuition[] = [
    {
        id: "tuition-1",
        student: "John Smith",
        subjects: [
            { name: "Mathematics", totalTasks: 10, completedTasks: 7 },
            { name: "Physics", totalTasks: 8, completedTasks: 5 },
        ],
        totalTasks: 18,
        completedTasks: 12,
        sessionDays: ["Monday", "Wednesday"],
        from: "10:00 AM",
        to: "12:00 PM",
        duration: "2 hours",
        grade: "Grade 11",
        startDate: "2024-11-01",
        status: "on-going",
    },
    {
        id: "tuition-2",
        student: "Emily Chen",
        subjects: [
            { name: "Chemistry", totalTasks: 12, completedTasks: 5 },
            { name: "Biology", totalTasks: 15, completedTasks: 9 },
        ],
        totalTasks: 27,
        completedTasks: 14,
        sessionDays: ["Tuesday", "Thursday"],
        from: "2:00 PM",
        to: "3:30 PM",
        duration: "1.5 hours",
        grade: "Grade 12",
        startDate: "2024-10-15",
        status: "on-going",
    },
    {
        id: "tuition-3",
        student: "Sarah Williams",
        subjects: [
            { name: "English", totalTasks: 8, completedTasks: 8 },
            { name: "Literature", totalTasks: 6, completedTasks: 6 },
            { name: "Mathematics", totalTasks: 10, completedTasks: 10 },
        ],
        totalTasks: 24,
        completedTasks: 24,
        sessionDays: ["Friday"],
        from: "4:00 PM",
        to: "6:00 PM",
        duration: "2 hours",
        startDate: "2024-09-01",
        status: "on-going",
    },
];
