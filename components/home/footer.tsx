import { cn } from "@/lib/utils";
import { BookOpen } from "lucide-react";

export default function Footer({ className }: { className?: string }) {
    return (
        <footer
            className={cn(
                "bg-foreground px-20 py-12 text-background",
                className
            )}
        >
            <div className="flex justify-between gap-8">
                <div className="w-1/3 flex flex-col items-center">
                    <div className="flex items-center gap-2">
                        <BookOpen />
                        <h2 className="text-2xl font-semibold">TutorDock</h2>
                    </div>
                    <p className="text-sm">
                        Making quality education accessible through personalized
                        home tutoring.
                    </p>
                </div>
                <div className="w-1/3 border-l-2 border-default flex flex-col items-center">
                    <h3 className="font-semibold mb-4">Quick Links</h3>
                    <ul className="space-y-2 text-sm relative left-1">
                        <li>
                            <a href="#" className="hover:text-gray-300">
                                Find a Tutor
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-gray-300">
                                Become a Tutor
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-gray-300">
                                How it Works
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-gray-300">
                                Pricing
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="w-1/3 border-l-2 border-default flex flex-col items-center">
                    <h3 className="font-semibold mb-4">Contact</h3>
                    <ul className="space-y-2 text-sm">
                        <li>support@tutordock.com</li>
                        <li>1-800-TUTOR</li>
                        <li>Mon - Fri: 9AM - 6PM</li>
                    </ul>
                </div>
            </div>
            <p className="mt-10 text-center text-sm">
                &copy; 2024 TutorDock. All rights reserved.
            </p>
        </footer>
    );
}
