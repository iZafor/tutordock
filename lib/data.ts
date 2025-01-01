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
                totalTasks: 2,
                completedTasks: 1,
            },
            {
                name: "Physics",
                totalTasks: 2,
                completedTasks: 1,
            },
        ],
        tutor: "Dr. Smith",
        totalTasks: 4,
        completedTasks: 2,
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
                totalTasks: 2,
                completedTasks: 0,
            },
            {
                name: "Biology",
                totalTasks: 2,
                completedTasks: 1,
            },
        ],
        tutor: "Prof. Johnson",
        totalTasks: 4,
        completedTasks: 1,
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
                totalTasks: 2,
                completedTasks: 2,
            },
            {
                name: "Literature",
                totalTasks: 1,
                completedTasks: 1,
            },
            {
                name: "Mathematics",
                totalTasks: 1,
                completedTasks: 1,
            },
        ],
        tutor: "Dr. Williams",
        totalTasks: 4,
        completedTasks: 4,
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
                        maxPoints: 100,
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
                            file: {
                                name: "linear-algebra-quiz.pdf",
                                url: "/submissions/linear-algebra-quiz.pdf",
                            },
                        },
                        maxPoints: 50,
                        score: 42,
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
                        maxPoints: 100,
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
                            file: {
                                name: "thermodynamics-problems.pdf",
                                url: "/submissions/thermodynamics-problems.pdf",
                            },
                        },
                        maxPoints: 75,
                        score: 68,
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
                        maxPoints: 100,
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
                        maxPoints: 50,
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
                        maxPoints: 50,
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
                            file: {
                                name: "genetics-project.pdf",
                                url: "/submissions/genetics-project.pdf",
                            },
                        },
                        maxPoints: 100,
                        score: 90,
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
                            file: {
                                name: "analytical-essay.pdf",
                                url: "/submissions/analytical-essay.pdf",
                            },
                        },
                        maxPoints: 100,
                        score: 95,
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
                            file: {
                                name: "grammar-assessment.pdf",
                                url: "/submissions/grammar-assessment.pdf",
                            },
                        },
                        maxPoints: 50,
                        score: 48,
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
                            file: {
                                name: "shakespeare-analysis.pdf",
                                url: "/submissions/shakespeare-analysis.pdf",
                            },
                        },
                        maxPoints: 100,
                        score: 92,
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
                            file: {
                                name: "calculus-final.pdf",
                                url: "/submissions/calculus-final.pdf",
                            },
                        },
                        maxPoints: 100,
                        score: 88,
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
            {
                name: "Mathematics",
                totalTasks: 2,
                completedTasks: 1,
            },
            {
                name: "Physics",
                totalTasks: 2,
                completedTasks: 1,
            },
        ],
        totalTasks: 4,
        completedTasks: 2,
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
            {
                name: "Chemistry",
                totalTasks: 2,
                completedTasks: 0,
            },
            {
                name: "Biology",
                totalTasks: 2,
                completedTasks: 1,
            },
        ],
        totalTasks: 4,
        completedTasks: 1,
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
            {
                name: "English",
                totalTasks: 2,
                completedTasks: 2,
            },
            {
                name: "Literature",
                totalTasks: 1,
                completedTasks: 1,
            },
            {
                name: "Mathematics",
                totalTasks: 1,
                completedTasks: 1,
            },
        ],
        totalTasks: 4,
        completedTasks: 4,
        sessionDays: ["Friday"],
        from: "4:00 PM",
        to: "6:00 PM",
        duration: "2 hours",
        startDate: "2024-09-01",
        status: "on-going",
    },
];

export const tuitionDetailsMockDataForTutor: TuitionDetails[] = [
    {
        id: "tuition-1",
        student: {
            name: "John Smith",
            bio: "11th grade student with keen interest in STEM subjects. Aspiring engineer with strong analytical skills.",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
        },
        subjects: [
            {
                id: "math-11",
                name: "Mathematics",
                tasks: [
                    {
                        id: "math-task-1",
                        title: "Differential Calculus Assignment",
                        assignedDate: "2024-12-20",
                        dueDate: "2024-12-27",
                        status: "pending",
                        description:
                            "Complete problems 1-10 from Chapter 4 on differentiation",
                        submission: {
                            status: "draft",
                            date: "2024-12-26",
                        },
                        maxPoints: 100,
                    },
                    {
                        id: "math-task-2",
                        title: "Algebra Quiz",
                        assignedDate: "2024-12-15",
                        dueDate: "2024-12-22",
                        status: "completed",
                        description: "Online quiz covering quadratic equations",
                        submission: {
                            status: "submitted",
                            date: "2024-12-21",
                            file: {
                                name: "algebra-quiz-submission.pdf",
                                url: "/submissions/algebra-quiz-submission.pdf",
                            },
                        },
                        maxPoints: 50,
                        score: 45,
                    },
                ],
                resources: [
                    {
                        id: "math-res-1",
                        name: "Calculus Fundamentals",
                        type: "document",
                        url: "/resources/calculus-basics.pdf",
                        dateAdded: "2024-11-01",
                    },
                    {
                        id: "math-res-2",
                        name: "Algebra Practice Problems",
                        type: "document",
                        url: "/resources/algebra-practice.pdf",
                        dateAdded: "2024-11-05",
                    },
                ],
            },
            {
                id: "physics-11",
                name: "Physics",
                tasks: [
                    {
                        id: "physics-task-1",
                        title: "Newton's Laws Lab Report",
                        assignedDate: "2024-12-18",
                        dueDate: "2024-12-25",
                        status: "pending",
                        description:
                            "Write a lab report on the experiments conducted on Newton's laws",
                        submission: {
                            status: "draft",
                        },
                        maxPoints: 100,
                    },
                ],
                resources: [
                    {
                        id: "physics-res-1",
                        name: "Mechanics Video Lecture",
                        type: "video",
                        url: "/resources/mechanics-lecture.mp4",
                        dateAdded: "2024-11-10",
                    },
                ],
            },
        ],
        sessionDays: ["Monday", "Wednesday"],
        from: "10:00",
        to: "12:00",
        duration: "2 hours",
    },
    {
        id: "tuition-2",
        student: {
            name: "Emily Chen",
            bio: "12th grade student preparing for medical school. Strong foundation in biology and chemistry.",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
        },
        subjects: [
            {
                id: "chem-12",
                name: "Chemistry",
                tasks: [
                    {
                        id: "chem-task-1",
                        title: "Organic Chemistry Worksheet",
                        assignedDate: "2024-12-19",
                        dueDate: "2024-12-26",
                        status: "pending",
                        description:
                            "Complete the worksheet on organic compounds and their reactions",
                        submission: {
                            status: null,
                        },
                        maxPoints: 50,
                    },
                ],
                resources: [
                    {
                        id: "chem-res-1",
                        name: "Organic Chemistry Notes",
                        type: "document",
                        url: "/resources/organic-chem.pdf",
                        dateAdded: "2024-10-15",
                    },
                ],
            },
            {
                id: "bio-12",
                name: "Biology",
                tasks: [
                    {
                        id: "bio-task-1",
                        title: "Genetics Case Study",
                        assignedDate: "2024-12-15",
                        dueDate: "2024-12-22",
                        status: "completed",
                        description:
                            "Analyze the given genetic inheritance patterns",
                        submission: {
                            status: "submitted",
                            date: "2024-12-21",
                            file: {
                                name: "genetics-case-study.pdf",
                                url: "/submissions/genetics-case-study.pdf",
                            },
                        },
                        maxPoints: 100,
                        score: 92,
                    },
                ],
                resources: [
                    {
                        id: "bio-res-1",
                        name: "Human Anatomy Reference",
                        type: "link",
                        url: "https://example.com/anatomy",
                        dateAdded: "2024-10-20",
                    },
                ],
            },
        ],
        sessionDays: ["Tuesday", "Thursday"],
        from: "14:00",
        to: "15:30",
        duration: "1.5 hours",
    },
    {
        id: "tuition-3",
        student: {
            name: "Sarah Williams",
            bio: "10th grade student with a passion for literature and creative writing.",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
        },
        subjects: [
            {
                id: "eng-10",
                name: "English",
                tasks: [
                    {
                        id: "eng-task-1",
                        title: "Essay Writing",
                        assignedDate: "2024-12-10",
                        dueDate: "2024-12-17",
                        status: "completed",
                        description: "Write a 1000-word analytical essay",
                        submission: {
                            status: "submitted",
                            date: "2024-12-16",
                            file: {
                                name: "analytical-essay.doc",
                                url: "/submissions/analytical-essay.doc",
                            },
                        },
                        maxPoints: 100,
                        score: 95,
                    },
                ],
                resources: [
                    {
                        id: "eng-res-1",
                        name: "Essay Writing Guide",
                        type: "document",
                        url: "/resources/essay-guide.pdf",
                        dateAdded: "2024-09-01",
                    },
                ],
            },
            {
                id: "lit-10",
                name: "Literature",
                tasks: [
                    {
                        id: "lit-task-1",
                        title: "Book Review",
                        assignedDate: "2024-12-05",
                        dueDate: "2024-12-12",
                        status: "completed",
                        description:
                            "Write a review of 'To Kill a Mockingbird'",
                        submission: {
                            status: "submitted",
                            date: "2024-12-11",
                            file: {
                                name: "book-review.pdf",
                                url: "/submissions/book-review.pdf",
                            },
                        },
                        maxPoints: 50,
                        score: 48,
                    },
                ],
                resources: [
                    {
                        id: "lit-res-1",
                        name: "Literary Analysis Techniques",
                        type: "document",
                        url: "/resources/literary-analysis.pdf",
                        dateAdded: "2024-09-05",
                    },
                ],
            },
            {
                id: "math-10",
                name: "Mathematics",
                tasks: [
                    {
                        id: "math-task-3",
                        title: "Final Assessment",
                        assignedDate: "2024-12-01",
                        dueDate: "2024-12-08",
                        status: "completed",
                        description:
                            "Complete the final assessment covering all topics",
                        submission: {
                            status: "submitted",
                            date: "2024-12-07",
                            file: {
                                name: "final-assessment.pdf",
                                url: "/submissions/final-assessment.pdf",
                            },
                        },
                        maxPoints: 100,
                        score: 88,
                    },
                ],
                resources: [
                    {
                        id: "math-res-3",
                        name: "Mathematics Formula Sheet",
                        type: "document",
                        url: "/resources/math-formulas.pdf",
                        dateAdded: "2024-09-10",
                    },
                ],
            },
        ],
        sessionDays: ["Tuesday", "Thursday"],
        from: "16:00",
        to: "17:30",
        duration: "1.5 hours",
    },
];

export const tuitionOfferMockDataForTutor: TuitionOffer[] = [
    {
        offerId: "TO-2024-001",
        student: {
            name: "Saima Rahman",
            grade: "Class 10",
            rating: "4.8",
            address: "House 15, Road 3, Block B, Banani, Dhaka-1213",
        },
        budget: {
            amount: 3000,
            rateType: "month",
        },
        startDate: "2025-01-15",
        subjects: ["Mathematics", "Chemistry"],
        schedule: {
            weekdays: ["Monday", "Wednesday"],
            startTime: "16:00",
            endTime: "18:00",
        },
        mode: "online",
    },
    {
        offerId: "TO-2024-002",
        student: {
            name: "Mehedi Hassan",
            grade: "Class 8",
            rating: "4.5",
            address: "Flat 4A, House 27, Road 12, Uttara Sector 7, Dhaka-1230",
        },
        budget: {
            amount: 2500,
            rateType: "month",
        },
        startDate: "2025-02-01",
        subjects: ["English", "Science"],
        schedule: {
            weekdays: ["Tuesday", "Thursday", "Saturday"],
            startTime: "14:00",
            endTime: "15:30",
        },
        mode: "in-person",
    },
    {
        offerId: "TO-2024-003",
        student: {
            name: "Tasnia Ferdous",
            grade: "Class 11",
            rating: "4.9",
            address: "House 45, Road 8/A, Dhanmondi, Dhaka-1209",
        },
        budget: {
            amount: 4000,
            rateType: "month",
        },
        startDate: "2025-01-20",
        subjects: ["Physics", "Higher Mathematics"],
        schedule: {
            weekdays: ["Wednesday", "Friday"],
            startTime: "17:00",
            endTime: "19:00",
        },
        mode: "hybrid",
    },
    {
        offerId: "TO-2024-004",
        student: {
            name: "Rafid Khan",
            grade: "Class 9",
            rating: "4.7",
            address: "House 12, Block D, Bashundhara R/A, Dhaka-1229",
        },
        budget: {
            amount: 3500,
            rateType: "month",
        },
        startDate: "2025-02-05",
        subjects: ["Bangla", "Mathematics"],
        schedule: {
            weekdays: ["Sunday", "Tuesday"],
            startTime: "15:00",
            endTime: "17:00",
        },
        mode: "in-person",
    },
    {
        offerId: "TO-2024-005",
        student: {
            name: "Nabila Hossain",
            grade: "Class 12",
            rating: "4.6",
            address: "Plot 7, Road 2, Block C, Gulshan-1, Dhaka-1212",
        },
        budget: {
            amount: 4500,
            rateType: "month",
        },
        startDate: "2025-01-25",
        subjects: ["Chemistry", "Biology"],
        schedule: {
            weekdays: ["Monday", "Wednesday", "Thursday"],
            startTime: "18:00",
            endTime: "20:00",
        },
        mode: "hybrid",
    },
];

export const tuitionOfferMockDataForTutorApplied: TuitionOffer[] = [
    {
        offerId: "TO-2024-001",
        student: {
            name: "Rahima Akter",
            grade: "Class 9",
            rating: "4.8",
            address: "Block C, Bashundhara R/A, Dhaka",
        },
        budget: {
            amount: 3000,
            rateType: "month",
        },
        preferredBudget: {
            amount: 3500,
            rateType: "month",
        },
        startDate: "2024-01-15",
        applicationDate: "2024-01-02",
        subjects: ["Mathematics", "Physics"],
        schedule: {
            weekdays: ["Saturday", "Monday"],
            startTime: "16:00",
            endTime: "18:00",
        },
        preferredSchedule: {
            weekdays: ["Sunday", "Tuesday"],
            startTime: "15:00",
            endTime: "17:00",
        },
        mode: "in-person",
        preferredMode: "hybrid",
        status: "pending",
    },
    {
        offerId: "TO-2024-002",
        student: {
            name: "Abdul Karim",
            grade: "Class 5",
            rating: "4.5",
            address: "Road 27, Dhanmondi, Dhaka",
        },
        budget: {
            amount: 500,
            rateType: "hour",
        },
        preferredBudget: {
            amount: 600,
            rateType: "hour",
        },
        startDate: "2024-01-20",
        applicationDate: "2024-01-05",
        acceptedDate: "2024-01-08",
        subjects: ["English", "Science"],
        schedule: {
            weekdays: ["Sunday", "Wednesday"],
            startTime: "14:00",
            endTime: "16:00",
        },
        preferredSchedule: {
            weekdays: ["Sunday", "Wednesday"],
            startTime: "15:00",
            endTime: "17:00",
        },
        mode: "hybrid",
        preferredMode: "online",
        status: "accepted",
    },
    {
        offerId: "TO-2024-003",
        student: {
            name: "Tasnim Islam",
            grade: "HSC 1st Year",
            rating: "4.9",
            address: "Uttara Sector 7, Dhaka",
        },
        budget: {
            amount: 800,
            rateType: "hour",
        },
        preferredBudget: {
            amount: 1000,
            rateType: "hour",
        },
        startDate: "2024-02-01",
        applicationDate: "2024-01-15",
        rejectedDate: "2024-01-20",
        subjects: ["Chemistry", "Biology"],
        schedule: {
            weekdays: ["Tuesday", "Friday"],
            startTime: "17:00",
            endTime: "19:00",
        },
        preferredSchedule: {
            weekdays: ["Monday", "Thursday"],
            startTime: "16:00",
            endTime: "18:00",
        },
        mode: "online",
        preferredMode: "online",
        status: "rejected",
    },
    {
        offerId: "TO-2024-004",
        student: {
            name: "Mohammad Hassan",
            grade: "Class 10",
            rating: "4.7",
            address: "Gulshan-2, Road 55, Dhaka",
        },
        budget: {
            amount: 4500,
            rateType: "month",
        },
        preferredBudget: {
            amount: 5000,
            rateType: "month",
        },
        startDate: "2024-01-25",
        applicationDate: "2024-01-10",
        subjects: ["Higher Math", "Chemistry"],
        schedule: {
            weekdays: ["Saturday", "Monday", "Wednesday"],
            startTime: "15:00",
            endTime: "17:00",
        },
        preferredSchedule: {
            weekdays: ["Saturday", "Monday", "Wednesday"],
            startTime: "16:00",
            endTime: "18:00",
        },
        mode: "in-person",
        preferredMode: "in-person",
        status: "pending",
    },
    {
        offerId: "TO-2024-005",
        student: {
            name: "Fatima Begum",
            grade: "Class 4",
            rating: "4.6",
            address: "Mirpur DOHS, Road 12, Dhaka",
        },
        budget: {
            amount: 2500,
            rateType: "month",
        },
        preferredBudget: {
            amount: 3000,
            rateType: "month",
        },
        startDate: "2024-02-05",
        applicationDate: "2024-01-20",
        subjects: ["Mathematics", "Bangla"],
        schedule: {
            weekdays: ["Sunday", "Tuesday"],
            startTime: "14:30",
            endTime: "16:30",
        },
        preferredSchedule: {
            weekdays: ["Monday", "Wednesday"],
            startTime: "15:00",
            endTime: "17:00",
        },
        mode: "hybrid",
        preferredMode: "in-person",
        status: "pending",
    },
];
