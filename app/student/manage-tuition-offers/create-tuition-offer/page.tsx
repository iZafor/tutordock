"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { Calendar, Check, Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command";
import { CommandList } from "cmdk";
import { useState } from "react";

const formSchema = z.object({
    budget: z.object({
        amount: z.number().min(1, "Amount must be greater than 0"),
        rateType: z.enum(["hour", "month", "week"]),
    }),
    startDate: z
        .date({
            required_error: "Start date is required",
        })
        .min(new Date(), "Start date must be in the future"),
    subjects: z.array(z.string()).min(1, "At least one subject is required"),
    schedule: z.object({
        weekdays: z
            .array(z.string())
            .min(1, "At least one weekday is required"),
        startTime: z
            .string()
            .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format"),
        endTime: z
            .string()
            .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format"),
    }),
    mode: z.enum(["online", "in-person", "hybrid"]),
});

const weekdays = [
    { value: "Monday" },
    { value: "Tuesday" },
    { value: "Wednesday" },
    { value: "Thursday" },
    { value: "Friday" },
    { value: "Saturday" },
    { value: "Sunday" },
];

export default function TuitionOfferForm() {
    const [subjects, setSubjects] = useState<string[]>([
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology",
        "English",
    ]);
    const [searchValue, setSearchValue] = useState("");

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            budget: {
                amount: 0,
                rateType: "hour",
            },
            subjects: [],
            schedule: {
                weekdays: [],
                startTime: "",
                endTime: "",
            },
            mode: "online",
        },
    });

    const filteredSubjects = subjects.filter((subject) =>
        subject.toLowerCase().includes(searchValue.toLowerCase())
    );

    const isNewSubject =
        searchValue !== "" &&
        !subjects.some(
            (subject) => subject.toLowerCase() === searchValue.toLowerCase()
        );

    const handleAddSubject = () => {
        if (searchValue && !subjects.includes(searchValue)) {
            setSubjects([...subjects, searchValue]);
            const currentSubjects = form.getValues("subjects");
            form.setValue("subjects", [...currentSubjects, searchValue]);
            setSearchValue("");
        }
    };

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        const offerData = {
            ...values,
            offerId: `TO-${format(new Date(), "yyyy")}-${Math.floor(
                Math.random() * 1000
            )
                .toString()
                .padStart(3, "0")}`,
            status: "pending" as const,
        };
        console.log(offerData);
    };

    return (
        <Card className="flex justify-center py-6">
            <Card className="w-[488px]">
                <CardHeader>
                    <CardTitle>Create Tuition Offer</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-8"
                        >
                            {/* Budget Section */}
                            <div className="grid gap-4 md:grid-cols-2">
                                <FormField
                                    control={form.control}
                                    name="budget.amount"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Budget Amount</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    {...field}
                                                    onChange={(e) =>
                                                        field.onChange(
                                                            Number(
                                                                e.target.value
                                                            )
                                                        )
                                                    }
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="budget.rateType"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Rate Type</FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select rate type" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="hour">
                                                        Per Hour
                                                    </SelectItem>
                                                    <SelectItem value="week">
                                                        Per Week
                                                    </SelectItem>
                                                    <SelectItem value="month">
                                                        Per Month
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {/* Start Date */}
                            <FormField
                                control={form.control}
                                name="startDate"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Start Date</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "pl-3 text-left font-normal",
                                                            !field.value &&
                                                                "text-muted-foreground"
                                                        )}
                                                    >
                                                        {field.value ? (
                                                            format(
                                                                field.value,
                                                                "PPP"
                                                            )
                                                        ) : (
                                                            <span>
                                                                Pick a date
                                                            </span>
                                                        )}
                                                        <Calendar className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent
                                                className="w-auto p-0"
                                                align="start"
                                            >
                                                <CalendarComponent
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    disabled={(date) =>
                                                        date < new Date()
                                                    }
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Subjects */}
                            <FormField
                                control={form.control}
                                name="subjects"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Subjects</FormLabel>
                                        <div className="flex flex-wrap gap-2 mb-2">
                                            {field.value.map((subject) => (
                                                <Badge
                                                    key={subject}
                                                    variant="secondary"
                                                    className="flex items-center gap-1"
                                                >
                                                    {subject}
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-4 w-4 p-0 hover:bg-transparent"
                                                        onClick={() => {
                                                            field.onChange(
                                                                field.value.filter(
                                                                    (s) =>
                                                                        s !==
                                                                        subject
                                                                )
                                                            );
                                                        }}
                                                    >
                                                        <X className="h-3 w-3" />
                                                    </Button>
                                                </Badge>
                                            ))}
                                        </div>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant="outline"
                                                        className="w-full justify-start text-muted-foreground"
                                                    >
                                                        Select or type to add
                                                        new subjects
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent
                                                asChild
                                                align="start"
                                            >
                                                <Command>
                                                    <CommandInput
                                                        placeholder="Search subjects..."
                                                        value={searchValue}
                                                        onValueChange={
                                                            setSearchValue
                                                        }
                                                    />
                                                    <CommandList>
                                                        <CommandEmpty>
                                                            {isNewSubject ? (
                                                                <div className="flex items-center justify-between px-2 py-1.5">
                                                                    <span>
                                                                        Add{" "}
                                                                        {`'${searchValue}"`}
                                                                    </span>
                                                                    <Button
                                                                        type="button"
                                                                        size="sm"
                                                                        variant="secondary"
                                                                        onClick={
                                                                            handleAddSubject
                                                                        }
                                                                    >
                                                                        <Plus className="h-4 w-4 mr-2" />
                                                                        Add
                                                                    </Button>
                                                                </div>
                                                            ) : (
                                                                "No subjects found."
                                                            )}
                                                        </CommandEmpty>
                                                        <CommandGroup className="max-h-48 overflow-auto">
                                                            {filteredSubjects.map(
                                                                (subject) => (
                                                                    <CommandItem
                                                                        key={
                                                                            subject
                                                                        }
                                                                        onSelect={() => {
                                                                            if (
                                                                                !field.value.includes(
                                                                                    subject
                                                                                )
                                                                            ) {
                                                                                field.onChange(
                                                                                    [
                                                                                        ...field.value,
                                                                                        subject,
                                                                                    ]
                                                                                );
                                                                            }
                                                                            setSearchValue(
                                                                                ""
                                                                            );
                                                                        }}
                                                                    >
                                                                        {
                                                                            subject
                                                                        }
                                                                    </CommandItem>
                                                                )
                                                            )}
                                                        </CommandGroup>
                                                    </CommandList>
                                                </Command>
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Schedule */}
                            <div className="space-y-4">
                                <FormLabel>Schedule</FormLabel>
                                <div className="grid gap-4 md:grid-cols-2">
                                    <FormField
                                        control={form.control}
                                        name="schedule.startTime"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Start Time
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="time"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="schedule.endTime"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>End Time</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="time"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <FormField
                                    control={form.control}
                                    name="schedule.weekdays"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Weekdays</FormLabel>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                            variant="outline"
                                                            className={cn(
                                                                "w-full justify-between text-muted-foreground",
                                                                !field.value &&
                                                                    "text-muted-foreground"
                                                            )}
                                                        >
                                                            {field.value
                                                                ?.length > 0
                                                                ? `Selected ${field.value.length} day(s)`
                                                                : "Select days"}
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent align="start">
                                                    <Command>
                                                        <CommandInput placeholder="Search days..." />
                                                        <CommandList>
                                                            <CommandEmpty>
                                                                No days found.
                                                            </CommandEmpty>
                                                            <CommandGroup>
                                                                {weekdays.map(
                                                                    (day) => (
                                                                        <CommandItem
                                                                            key={
                                                                                day.value
                                                                            }
                                                                            onSelect={() => {
                                                                                const currentValue =
                                                                                    field.value ||
                                                                                    [];
                                                                                const newValue =
                                                                                    currentValue.includes(
                                                                                        day.value
                                                                                    )
                                                                                        ? currentValue.filter(
                                                                                              (
                                                                                                  d
                                                                                              ) =>
                                                                                                  d !==
                                                                                                  day.value
                                                                                          )
                                                                                        : [
                                                                                              ...currentValue,
                                                                                              day.value,
                                                                                          ];
                                                                                field.onChange(
                                                                                    newValue
                                                                                );
                                                                            }}
                                                                        >
                                                                            <div
                                                                                className={cn(
                                                                                    "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                                                                                    field.value?.includes(
                                                                                        day.value
                                                                                    )
                                                                                        ? "bg-primary text-primary-foreground"
                                                                                        : "opacity-50 [&_svg]:invisible"
                                                                                )}
                                                                            >
                                                                                <Check
                                                                                    className={cn(
                                                                                        "h-4 w-4"
                                                                                    )}
                                                                                />
                                                                            </div>
                                                                            {
                                                                                day.value
                                                                            }
                                                                        </CommandItem>
                                                                    )
                                                                )}
                                                            </CommandGroup>
                                                        </CommandList>
                                                    </Command>
                                                </PopoverContent>
                                            </Popover>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {/* Mode */}
                            <FormField
                                control={form.control}
                                name="mode"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Mode</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select mode" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="online">
                                                    Online
                                                </SelectItem>
                                                <SelectItem value="in-person">
                                                    In Person
                                                </SelectItem>
                                                <SelectItem value="hybrid">
                                                    Hybrid
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button className="w-full" type="submit">
                                Create Offer
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </Card>
    );
}
