import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

const subjects = [
    { name: "Mathematics", popularity: 95, students: 2400 },
    { name: "Physics", popularity: 85, students: 1800 },
    { name: "Chemistry", popularity: 80, students: 1600 },
    { name: "English", popularity: 90, students: 2200 },
    { name: "Biology", popularity: 75, students: 1400 },
    { name: "Computer Science", popularity: 88, students: 2000 },
    { name: "History", popularity: 70, students: 1200 },
    { name: "Languages", popularity: 82, students: 1700 },
];

const getBackgroundColor = (popularity: number) => {
    if (popularity >= 90) {
        return "bg-gradient-to-r from-primary/20 to-primary/30";
    }
    if (popularity >= 80) {
        return "bg-gradient-to-r from-primary/15 to-primary/20";
    }
    return "bg-gradient-to-r from-primary/5 to-primary/10";
};

export default function PopularSubjects({ className }: { className?: string }) {
    return (
        <div className={cn(className)}>
            <h2 className="text-3xl font-bold mb-4 text-center">
                Popular Subjects
            </h2>
            <p className="text-gray-400 text-center mb-8">
                Discover our most sought-after subjects based on student
                enrollment
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {subjects.map((subject, index) => (
                    <div key={index} className="relative group">
                        <Button
                            variant="outline"
                            className={`w-full justify-between ${getBackgroundColor(
                                subject.popularity
                            )} 
                          hover:bg-primary/20 transition-all duration-300 h-auto py-4`}
                        >
                            <div className="flex flex-col items-start">
                                <span className="font-semibold">
                                    {subject.name}
                                </span>
                                <span className="text-xs text-gray-500">
                                    {subject.students}+ students
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="flex items-center">
                                    <div
                                        className="h-2 bg-primary/30 rounded-full"
                                        style={{
                                            width: `${
                                                subject.popularity * 0.3
                                            }px`,
                                        }}
                                    />
                                </div>
                                <ChevronRight className="h-4 w-4 text-primary" />
                            </div>
                        </Button>
                        <div
                            className="absolute -top-2 -right-2 bg-primary text-background text-xs px-2 py-1 rounded-full opacity-0 
                        group-hover:opacity-100 transition-opacity duration-200"
                        >
                            {subject.popularity}% popular
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
