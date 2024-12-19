"use client";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { GraduationCapIcon, PresentationIcon, UsersIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NavbarSignupButton() {
    const router = useRouter();

    function handleRouting(role: string) {
        router.push(`/signup/${role}`);
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button color="primary">Signup</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => handleRouting("student")}
                >
                    <GraduationCapIcon className="size-4" /> Student
                </DropdownMenuItem>
                <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => handleRouting("parent")}
                >
                    <UsersIcon className="size-4" /> Parent
                </DropdownMenuItem>
                <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => handleRouting("tutor")}
                >
                    <PresentationIcon className="size-4" /> Tutor
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
