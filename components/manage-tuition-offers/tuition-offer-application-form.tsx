"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { StateSetter } from "@/lib/extra-types";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, Star } from "lucide-react";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command";
import { CommandList } from "cmdk";
import { TuitionOffer } from "@/lib/types";
import { Badge } from "../ui/badge";

const applicationSchema = z.object({
    expectedBudget: z.object({
        amount: z.number().min(1, "Amount must be greater than 0"),
        rateType: z.enum(["hour", "month", "week"]),
    }),
    preferredSchedule: z.object({
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
    preferredMode: z.enum(["online", "in-person", "hybrid"]),
    message: z
        .string()
        .max(50, "Message must be at least 50 characters")
        .optional(),
});

type ApplicationFormData = z.infer<typeof applicationSchema>;

const weekdays = [
    { value: "Monday" },
    { value: "Tuesday" },
    { value: "Wednesday" },
    { value: "Thursday" },
    { value: "Friday" },
    { value: "Saturday" },
    { value: "Sunday" },
];

export default function TuitionOfferApplicationForm({
    offer,
    open,
    setOpen,
}: {
    offer: TuitionOffer;
    open: boolean;
    setOpen: StateSetter<boolean>;
}) {
    const form = useForm<ApplicationFormData>({
        resolver: zodResolver(applicationSchema),
        defaultValues: {
            message: "",
            expectedBudget: {
                ...offer.budget,
            },
            preferredSchedule: { ...offer.schedule },
            preferredMode: offer.mode,
        },
    });

    const handleSubmit = (data: ApplicationFormData) => {
        console.log(data);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader className="space-y-4">
                    <DialogTitle>Apply for Tuition</DialogTitle>
                    {offer.student && (
                        <div className="bg-muted/70 rounded-xl p-4">
                            <div className="flex items-start gap-4 mb-4">
                                <div className="space-y-1 flex-1">
                                    <div className="flex items-center gap-2">
                                        <h4 className="text-lg font-semibold tracking-tight">
                                            {offer.student.name}
                                        </h4>
                                        <Badge>{offer.student.grade}</Badge>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-background rounded-lg p-3 shadow-sm">
                                    <div className="text-sm text-muted-foreground mb-1">
                                        Rating
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="flex items-center gap-1">
                                            <Star className="h-4 w-4 text-yellow-400" />
                                            {offer.student.rating}
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-background rounded-lg p-3 shadow-sm">
                                    <div className="text-sm text-muted-foreground mb-1">
                                        Location
                                    </div>
                                    <div className="font-medium text-sm">
                                        {offer.student.address}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </DialogHeader>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(handleSubmit)}
                        className="space-y-6"
                    >
                        {/* Expected Budget */}
                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="expectedBudget.amount"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Expected Amount</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="Amount"
                                                {...field}
                                                onChange={(e) =>
                                                    field.onChange(
                                                        Number(e.target.value)
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
                                name="expectedBudget.rateType"
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

                        {/* Preferred Schedule */}
                        <div className="space-y-4">
                            <FormField
                                control={form.control}
                                name="preferredSchedule.weekdays"
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
                                                        {field.value?.length > 0
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

                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="preferredSchedule.startTime"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Start Time</FormLabel>
                                            <FormControl>
                                                <Input type="time" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="preferredSchedule.endTime"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>End Time</FormLabel>
                                            <FormControl>
                                                <Input type="time" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        {/* Preferred Mode */}
                        <FormField
                            control={form.control}
                            name="preferredMode"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Preferred Mode</FormLabel>
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

                        {/* Message */}
                        <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Message to Student</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Introduce yourself and explain why you're a good fit for this tuition..."
                                            className="min-h-[120px]"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <DialogFooter>
                            <Button type="submit">Submit Application</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
