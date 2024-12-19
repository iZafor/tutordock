"use client";

import { BookOpenIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import NavbarLoginButton from "@/components/ui/navbar-login-button";
import NavbarSignupButton from "@/components/ui/navbar-signup-button";
import React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function Navbar({ className }: { className?: string }) {
    const pathname = usePathname();

    return (
        <nav
            className={cn(
                "border-grid sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex items-center justify-between py-4 px-20",
                className
            )}
        >
            <Link href="/" className="flex items-center gap-4">
                <BookOpenIcon className="size-8" />
                <h2 className="text-xl font-semibold">TutorDock</h2>
            </Link>
            <div className="flex items-center gap-4">
                {(pathname === "/" || pathname.includes("/signup/")) && (
                    <>
                        <NavbarLoginButton />
                        <NavbarSignupButton />
                    </>
                )}
            </div>
        </nav>
    );
}
