import { Progress } from "@/components/ui/progress";
import { calculateSubjectTaskProgress } from "@/lib/student-analytics-util";
import { Subject } from "@/lib/types";
import { BookMarked } from "lucide-react";

export default function SidebarSubjectItem({
    subject,
    isActive,
    onClick,
}: {
    subject: Subject;
    isActive: boolean;
    onClick: () => void;
}) {
    return (
        <button
            onClick={onClick}
            className={`w-full text-left p-3 rounded-lg transition-all ${
                isActive
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-accent/50"
            }`}
        >
            <div className="flex items-center space-x-3">
                <BookMarked className="h-5 w-5" />
                <div className="flex-1">
                    <div className="font-medium">{subject.name}</div>
                    <div className="text-sm opacity-90">
                        {subject.tasks.length} tasks
                    </div>
                </div>
                <Progress
                    value={calculateSubjectTaskProgress(subject)}
                    className="w-12 h-1"
                />
            </div>
        </button>
    );
}
