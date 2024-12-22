"use client";

import Navbar from "@/components/ui/navbar";
import { BookOpenIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import NavbarLoginButton from "@/components/ui/navbar-login-button";
import NavbarSignupButton from "@/components/ui/navbar-signup-button";
import Link from "next/link";

export default function HomeNavbar() {
    const pathname = usePathname();

    return (
        (pathname === "/" || pathname.includes("/signup/")) && (
            <Navbar>
                <Link href="/" className="flex items-center gap-4">
                    <BookOpenIcon className="size-8" />
                    <h2 className="text-xl font-semibold">TutorDock</h2>
                </Link>
                <div className="flex items-center gap-4">
                    <NavbarLoginButton />
                    <NavbarSignupButton />
                </div>
            </Navbar>
        )
    );
}
