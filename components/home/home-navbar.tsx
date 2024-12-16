import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
} from "@nextui-org/react";
import { BookOpen } from "lucide-react";
import LoginForm from "./login-form";
import RegisterDropDown from "./register-dropdown";

export default function HomeNavbar({ className }: { className?: string }) {
    return (
        <Navbar
            isBordered
            shouldHideOnScroll
            isBlurred={false}
            maxWidth="full"
            className={className}
        >
            <NavbarBrand>
                <BookOpen />
                <p className="font-bold text-lg ml-2">TutorDock</p>
            </NavbarBrand>
            <NavbarContent justify="end">
                <NavbarItem className="lg:flex">
                    <LoginForm />
                </NavbarItem>
                <NavbarItem>
                    <RegisterDropDown />
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
}
