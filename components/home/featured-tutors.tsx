import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, GraduationCap } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const tutors = [
    {
        name: "Dr. Sarah Chen",
        avatar: "/avatars/sarah-chen.jpg",
        subjects: ["Mathematics", "Physics"],
        rating: 4.9,
        experience: 8,
        hourlyRate: 45,
        students: 234,
        shortBio:
            "PhD in Applied Mathematics, specializing in making complex concepts simple.",
        availability: "Weekdays & Weekends",
    },
    {
        name: "Prof. James Wilson",
        avatar: "/avatars/james-wilson.jpg",
        subjects: ["Chemistry", "Biology"],
        rating: 4.8,
        experience: 12,
        hourlyRate: 50,
        students: 312,
        shortBio:
            "Former university professor with a passion for interactive learning.",
        availability: "Weekday Evenings",
    },
    {
        name: "Emma Rodriguez",
        avatar: "/avatars/emma-rodriguez.jpg",
        subjects: ["English Literature", "Spanish"],
        rating: 4.9,
        experience: 6,
        hourlyRate: 40,
        students: 189,
        shortBio:
            "Bilingual educator focused on creative writing and language mastery.",
        availability: "Flexible Hours",
    },
    {
        name: "Dr. Michael Park",
        avatar: "/avatars/michael-park.jpg",
        subjects: ["Computer Science", "Mathematics"],
        rating: 4.7,
        experience: 10,
        hourlyRate: 55,
        students: 267,
        shortBio:
            "Tech industry veteran teaching programming and advanced mathematics.",
        availability: "Weekends",
    },
];

export default function FeaturedTutors({ className }: { className?: string }) {
    return (
        <div className={cn(className)}>
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">Featured Tutors</h2>
                    <p className="text-gray-400">
                        Learn from our highest-rated tutors who consistently
                        deliver exceptional results and maintain outstanding
                        student satisfaction.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {tutors.map((tutor, index) => (
                        <Card
                            key={index}
                            className="group hover:shadow-lg transition-shadow duration-300"
                        >
                            <CardHeader className="space-y-4">
                                <CardTitle className="flex items-center space-x-4">
                                    <Avatar>
                                        <AvatarImage
                                            src="https://github.com/shadcn.png"
                                            alt="@shadcn"
                                        />
                                        <AvatarFallback>
                                            {tutor.name}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <h3 className="font-semibold">
                                            {tutor.name}
                                        </h3>
                                        <div className="flex items-center text-sm text-muted-foreground">
                                            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                                            <span>{tutor.rating}</span>
                                            <span className="mx-2">•</span>
                                            <span>
                                                {tutor.students} students
                                            </span>
                                        </div>
                                    </div>
                                </CardTitle>
                            </CardHeader>

                            <CardContent className="space-y-4">
                                <div className="flex flex-wrap gap-2">
                                    {tutor.subjects.map((subject, idx) => (
                                        <Badge key={idx}>{subject}</Badge>
                                    ))}
                                </div>

                                <p className="text-sm text-muted-foreground line-clamp-2">
                                    {tutor.shortBio}
                                </p>

                                <div className="flex items-center justify-between text-sm">
                                    <div className="flex items-center text-muted-foreground">
                                        <GraduationCap className="h-4 w-4 mr-1" />
                                        <span>
                                            {tutor.experience} years exp.
                                        </span>
                                    </div>
                                    <div className="flex items-center text-muted-foreground">
                                        <Clock className="h-4 w-4 mr-1" />
                                        <span>${tutor.hourlyRate}/hr</span>
                                    </div>
                                </div>

                                <Button
                                    className="w-full mt-4"
                                    variant="outline"
                                >
                                    View Profile
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
