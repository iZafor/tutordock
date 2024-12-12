"use client";

import { MoveRight, User } from "lucide-react";
import { Button, Select, SelectItem } from "@nextui-org/react";
import { useState } from "react";

export const roles = [
    { key: "student", label: "Student" },
    { key: "parent", label: "Parent" },
    { key: "tutor", label: "Tutor" },
];

export default function Singup() {
    const [value, setValue] = useState<string | undefined>();
    const [isInvalid, setIsInvalid] = useState(false);

    function handleRegistrationRole() {
        if (!value || roles.map((r) => r.key).every((k) => k != value)) {
            setIsInvalid(true);
            return;
        }
        setIsInvalid(false);
    }

    return (
        <div className="w-full h-screen flex flex-col gap-4 items-center justify-center">
            <Select
                className="max-w-xs"
                errorMessage={isInvalid ? "You must select a role" : ""}
                isInvalid={isInvalid}
                label="Register as"
                placeholder="Select a role"
                value={value}
                onSelectionChange={(newState) =>
                    newState.currentKey == value
                        ? setValue(undefined)
                        : setValue(newState.currentKey)
                }
                startContent={
                    <User className={isInvalid ? "text-danger" : ""} />
                }
            >
                {roles.map((role) => (
                    <SelectItem key={role.key}>{role.label}</SelectItem>
                ))}
            </Select>
            <Button
                isIconOnly
                variant="ghost"
                size="md"
                className="rounded-full"
                onPress={handleRegistrationRole}
            >
                <MoveRight />
            </Button>
        </div>
    );
}
