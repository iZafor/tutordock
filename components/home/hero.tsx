"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Calendar, Search, Shield } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Hero({ className }: { className?: string }) {
    const router = useRouter();

    return (
        <div className={cn("mt-10 flex justify-between", className)}>
            <div className="space-y-6">
                <p className="p-1 font-semibold bg-slate-200 w-fit text-black rounded-md">
                    Trusted by 10,000+ families
                </p>
                <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                    Find Your Perfect Home Tutor in Minutes
                </h1>
                <p className="text-lg text-gray-400">
                    Connect with qualified and experienced tutors who come to
                    your home. Personalized learning, guaranteed results.
                </p>
                <div className="flex items-center gap-4">
                    <Button size="lg">
                        Find a Tutor <ArrowRight />
                    </Button>
                    <Button
                        size="lg"
                        variant="outline"
                        onClick={() => router.push("/signup/tutor")}
                    >
                        Become a Tutor
                    </Button>
                </div>
            </div>
            <Card className="justify-self-center px-6 py-4 w-1/3 flex flex-col gap-4 justify-center">
                <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Search className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                        <h3 className="font-semibold">Easy Search</h3>
                        <p className="text-sm text-gray-500">
                            Find tutors based on subject and location
                        </p>
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Calendar className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                        <h3 className="font-semibold">Flexible Scheduling</h3>
                        <p className="text-sm text-gray-500">
                            Book sessions at your convenience
                        </p>
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Shield className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                        <h3 className="font-semibold">Verified Tutors</h3>
                        <p className="text-sm text-gray-500">
                            All tutors are background checked
                        </p>
                    </div>
                </div>
            </Card>
        </div>
    );
}
