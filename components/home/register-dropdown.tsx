"use client";

import { Button } from "@nextui-org/button";
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
} from "@nextui-org/dropdown";
import { GraduationCapIcon, PresentationIcon, UsersIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function RegisterDropDown() {
    const router = useRouter();

    return (
        <Dropdown placement="bottom-end">
            <DropdownTrigger>
                <Button color="primary" variant="flat">
                    Register
                </Button>
            </DropdownTrigger>
            <DropdownMenu onAction={(key) => router.push(`/register/${key}`)}>
                <DropdownItem key="student">
                    <div className="flex gap-2 items-center">
                        <GraduationCapIcon className="size-4" /> Student
                    </div>
                </DropdownItem>
                <DropdownItem key="parent">
                    <div className="flex gap-2 items-center">
                        <UsersIcon className="size-4" /> Parent
                    </div>
                </DropdownItem>
                <DropdownItem key="tutor">
                    <div className="flex gap-2 items-center">
                        <PresentationIcon className="size-4" /> Tutor
                    </div>
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
}
