import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command";
import { CommandList } from "cmdk";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { StateSetter } from "@/lib/extra-types";
import { Button } from "@/components/ui/button";
import React from "react";

export default function ComboBox<T>({
    name,
    values,
    selectedValues,
    onSelect,
    className,
}: {
    name: string;
    values: T[];
    selectedValues: T[];
    onSelect: StateSetter<T[]>;
    className?: string;
}) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    className={cn(
                        "w-full justify-between text-muted-foreground",
                        className
                    )}
                >
                    {selectedValues.length > 0
                        ? `Selected ${selectedValues.length} ${name}(s)`
                        : "Select subjects"}
                </Button>
            </PopoverTrigger>
            <PopoverContent align="start">
                <Command>
                    <CommandInput placeholder="Search subjects..." />
                    <CommandList>
                        <CommandEmpty>No subjects found.</CommandEmpty>
                        <CommandGroup>
                            {values.map((value) => (
                                <CommandItem
                                    key={`${value}`}
                                    onSelect={() =>
                                        onSelect((prev) =>
                                            prev.includes(value)
                                                ? prev.filter(
                                                      (v) => v !== value
                                                  )
                                                : [value, ...prev]
                                        )
                                    }
                                >
                                    <div
                                        className={cn(
                                            "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                                            selectedValues.includes(value)
                                                ? "bg-primary text-primary-foreground"
                                                : "opacity-50 [&_svg]:invisible"
                                        )}
                                    >
                                        <Check className={cn("h-4 w-4")} />
                                    </div>
                                    {value as React.ReactNode}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
