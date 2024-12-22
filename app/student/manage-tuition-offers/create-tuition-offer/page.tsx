"use client";

import { z } from "zod";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "@radix-ui/react-popover";
import { format } from "date-fns";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

const tuitionOfferSchema = z.object({
    subjects: z
        .array(
            z.object({
                name: z.string().min(1, "Subject name is required"),
            })
        )
        .min(1, "At least one subject is required"),
    budget: z.object({
        amount: z.number().min(1, "Budget amount must be greater than 0"),
        rateType: z.enum(["hourly", "monthly", "fixed"]),
    }),
    timings: z
        .array(
            z.object({
                day: z.string(),
                startTime: z.string(),
                endTime: z.string(),
                isEnabled: z.boolean().default(false),
            })
        )
        .min(1, "At least one timing slot is required"),
    startDate: z.string().min(1, "Start date is required"),
    mode: z.enum(["online", "in-person", "hybrid"]),
    notes: z.string().optional(),
});

type TuitionOfferForm = z.infer<typeof tuitionOfferSchema>;

const DAYS_OF_WEEK = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];

export default function CreateTuitionOffer({
    onSubmit,
}: {
    onSubmit: (data: TuitionOfferForm) => void;
}) {
    const form = useForm<TuitionOfferForm>({
        resolver: zodResolver(tuitionOfferSchema),
        defaultValues: {
            subjects: [{ name: "" }],
            budget: {
                amount: 0,
                rateType: "hourly",
            },
            timings: DAYS_OF_WEEK.map((day) => ({
                day,
                startTime: "09:00",
                endTime: "10:00",
                isEnabled: false,
            })),
            startDate: "",
            mode: "online",
            notes: "",
        },
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "subjects",
    });

    const { fields: timingFields } = useFieldArray({
        control: form.control,
        name: "timings",
    });

    return (
        <Card>
            <CardContent className="flex justify-center py-6">
                <Card className="w-[40%]">
                    <CardContent className="py-6">
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-6"
                            >
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between">
                                        <FormLabel>Subjects</FormLabel>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => append({ name: "" })}
                                        >
                                            Add Subject
                                        </Button>
                                    </div>

                                    {fields.map((field, index) => (
                                        <div
                                            key={field.id}
                                            className="flex items-center gap-2"
                                        >
                                            <FormField
                                                control={form.control}
                                                name={`subjects.${index}.name`}
                                                render={({ field }) => (
                                                    <FormItem className="flex-1">
                                                        <FormControl>
                                                            <Input
                                                                placeholder="Enter subject name"
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            {fields.length > 1 && (
                                                <Button
                                                    type="button"
                                                    variant="destructive"
                                                    size="sm"
                                                    onClick={() =>
                                                        remove(index)
                                                    }
                                                >
                                                    Remove
                                                </Button>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                <Separator orientation="horizontal" />

                                <div className="space-y-4">
                                    <FormLabel>Budget Details</FormLabel>
                                    <div className="grid grid-cols-2 gap-4">
                                        <FormField
                                            control={form.control}
                                            name="budget.amount"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Amount
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="number"
                                                            placeholder="Enter amount"
                                                            {...field}
                                                            prefix="BDT"
                                                            onChange={(e) =>
                                                                field.onChange(
                                                                    Number(
                                                                        e.target
                                                                            .value
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
                                                    <FormLabel>
                                                        Rate Type
                                                    </FormLabel>
                                                    <Select
                                                        onValueChange={
                                                            field.onChange
                                                        }
                                                        defaultValue={
                                                            field.value
                                                        }
                                                    >
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select rate type" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem value="hourly">
                                                                Hourly
                                                            </SelectItem>
                                                            <SelectItem value="monthly">
                                                                Monthly
                                                            </SelectItem>
                                                            <SelectItem value="fixed">
                                                                Fixed
                                                            </SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>

                                <Separator orientation="horizontal" />

                                <div className="space-y-4">
                                    <FormLabel>Timing Details</FormLabel>
                                    <div className="flex flex-col gap-4">
                                        <FormField
                                            control={form.control}
                                            name="startDate"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-col">
                                                    <FormLabel>
                                                        Start Date
                                                    </FormLabel>
                                                    <Popover>
                                                        <PopoverTrigger asChild>
                                                            <FormControl>
                                                                <Button
                                                                    variant={
                                                                        "outline"
                                                                    }
                                                                    className={cn(
                                                                        "w-full pl-3 text-left font-normal",
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
                                                                            Pick
                                                                            a
                                                                            date
                                                                        </span>
                                                                    )}
                                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                                </Button>
                                                            </FormControl>
                                                        </PopoverTrigger>
                                                        <PopoverContent align="start">
                                                            <Card>
                                                                <CardContent>
                                                                    <Calendar
                                                                        mode="single"
                                                                        selected={
                                                                            new Date()
                                                                        }
                                                                        onSelect={
                                                                            field.onChange
                                                                        }
                                                                        disabled={(
                                                                            date
                                                                        ) =>
                                                                            date <
                                                                            new Date()
                                                                        }
                                                                        initialFocus
                                                                    />
                                                                </CardContent>
                                                            </Card>
                                                        </PopoverContent>
                                                    </Popover>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <div className="space-y-4 col-span-2">
                                            <FormLabel>
                                                Weekly Schedule
                                            </FormLabel>
                                            <div className="space-y-4">
                                                {timingFields.map(
                                                    (field, index) => (
                                                        <div
                                                            key={field.id}
                                                            className={`flex items-center gap-4 p-3 rounded-lg transition-colors
                    ${
                        form.watch(`timings.${index}.isEnabled`)
                            ? "bg-primary/5 border-primary/20"
                            : "bg-muted"
                    } 
                    border`}
                                                        >
                                                            <FormField
                                                                control={
                                                                    form.control
                                                                }
                                                                name={`timings.${index}.isEnabled`}
                                                                render={({
                                                                    field,
                                                                }) => (
                                                                    <FormItem className="flex items-center space-x-2">
                                                                        <FormControl>
                                                                            <Checkbox
                                                                                checked={
                                                                                    field.value
                                                                                }
                                                                                onCheckedChange={
                                                                                    field.onChange
                                                                                }
                                                                            />
                                                                        </FormControl>
                                                                        <FormLabel
                                                                            className="font-medium"
                                                                            style={{
                                                                                margin: "0px",
                                                                                marginLeft:
                                                                                    ".5rem",
                                                                            }}
                                                                        >
                                                                            {
                                                                                DAYS_OF_WEEK[
                                                                                    index
                                                                                ]
                                                                            }
                                                                        </FormLabel>
                                                                    </FormItem>
                                                                )}
                                                            />

                                                            {form.watch(
                                                                `timings.${index}.isEnabled`
                                                            ) && (
                                                                <div className="flex items-center gap-4 flex-1">
                                                                    <FormField
                                                                        control={
                                                                            form.control
                                                                        }
                                                                        name={`timings.${index}.startTime`}
                                                                        render={({
                                                                            field,
                                                                        }) => (
                                                                            <FormItem className="flex-1">
                                                                                <div className="flex items-center gap-2">
                                                                                    <FormLabel className="text-sm text-gray-500 w-16">
                                                                                        From
                                                                                    </FormLabel>
                                                                                    <FormControl>
                                                                                        <Input
                                                                                            type="time"
                                                                                            {...field}
                                                                                            className="max-w-[140px]"
                                                                                        />
                                                                                    </FormControl>
                                                                                </div>
                                                                                <FormMessage />
                                                                            </FormItem>
                                                                        )}
                                                                    />

                                                                    <FormField
                                                                        control={
                                                                            form.control
                                                                        }
                                                                        name={`timings.${index}.endTime`}
                                                                        render={({
                                                                            field,
                                                                        }) => (
                                                                            <FormItem className="flex-1">
                                                                                <div className="flex items-center gap-2">
                                                                                    <FormLabel className="text-sm text-gray-500 w-16">
                                                                                        To
                                                                                    </FormLabel>
                                                                                    <FormControl>
                                                                                        <Input
                                                                                            type="time"
                                                                                            {...field}
                                                                                            className="max-w-[140px]"
                                                                                        />
                                                                                    </FormControl>
                                                                                </div>
                                                                                <FormMessage />
                                                                            </FormItem>
                                                                        )}
                                                                    />
                                                                </div>
                                                            )}
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <Separator orientation="horizontal" />

                                <FormField
                                    control={form.control}
                                    name="mode"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Mode of Tuition
                                            </FormLabel>
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
                                                        In-Person
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

                                <FormField
                                    control={form.control}
                                    name="notes"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Additional Notes
                                            </FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Add any additional requirements or notes"
                                                    className="min-h-[100px]"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <Button type="submit" className="w-full">
                                    Create Tuition Offer
                                </Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </CardContent>
        </Card>
    );
}
