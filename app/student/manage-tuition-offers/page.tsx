"use client";

import { z } from "zod";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
    Filter,
    Plus,
    Eye,
    Edit,
    Trash2,
    Monitor,
    CheckCircle2,
    XCircle,
    Clock4,
    Clock,
    CalendarIcon,
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "@radix-ui/react-popover";
import { format } from "path";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";

interface TuitionOffer {
    offerId: string;
    budget: {
        amount: number;
        currency: string;
        rateType: "hourly" | "monthly" | "fixed";
    };
    timings: {
        startDate: string;
        duration: string;
        frequency: string;
        preferredTime: string;
    };
    subject: string;
    mode: "online" | "in-person" | "hybrid";
    status: "pending" | "accepted" | "rejected" | "expired";
    createdAt: string;
    studentName: string;
}

const offers: TuitionOffer[] = [
    {
        offerId: "TO-2024-001",
        budget: {
            amount: 50,
            currency: "USD",
            rateType: "hourly",
        },
        timings: {
            startDate: "2024-01-15",
            duration: "3 months",
            frequency: "2 times/week",
            preferredTime: "Evening",
        },
        subject: "Mathematics",
        mode: "online",
        status: "pending",
        createdAt: "2024-01-10",
        studentName: "John Smith",
    },
    {
        offerId: "TO-2024-002",
        budget: {
            amount: 400,
            currency: "USD",
            rateType: "monthly",
        },
        timings: {
            startDate: "2024-01-20",
            duration: "6 months",
            frequency: "3 times/week",
            preferredTime: "Afternoon",
        },
        subject: "Physics",
        mode: "hybrid",
        status: "accepted",
        createdAt: "2024-01-12",
        studentName: "Emma Wilson",
    },
];

const getStatusBadgeVariant = (status: string) => {
    switch (status) {
        case "pending":
            return "warning";
        case "accepted":
            return "success";
        case "rejected":
            return "destructive";
        case "expired":
            return "secondary";
        default:
            return "default";
    }
};

const getStatusIcon = (status: string) => {
    switch (status) {
        case "pending":
            return <Clock4 className="h-4 w-4" />;
        case "accepted":
            return <CheckCircle2 className="h-4 w-4" />;
        case "rejected":
            return <XCircle className="h-4 w-4" />;
        case "expired":
            return <Clock className="h-4 w-4" />;
        default:
            return null;
    }
};

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

function CreateTuitionOfferForm({
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
            duration: "",
            preferredTime: "flexible",
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
        <ScrollArea className="h-[600px] pr-4">
            <div className="px-2">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6"
                    >
                        <div className="space-y-4">
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
                                            onClick={() => remove(index)}
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
                                            <FormLabel>Amount</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    placeholder="Enter amount"
                                                    {...field}
                                                    prefix="BDT"
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
                                            <FormLabel>Start Date</FormLabel>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                            variant={"outline"}
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
                                                                    Pick a date
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
                                    <FormLabel>Weekly Schedule</FormLabel>
                                    <div className="space-y-4">
                                        {timingFields.map((field, index) => (
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
                                                    control={form.control}
                                                    name={`timings.${index}.isEnabled`}
                                                    render={({ field }) => (
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
                                        ))}
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
                                    <FormLabel>Mode of Tuition</FormLabel>
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
                                    <FormLabel>Additional Notes</FormLabel>
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
            </div>
        </ScrollArea>
    );
}

export default function ManageTuitionOffers() {
    const handleCreateOffer = (data: TuitionOfferForm) => {
        console.log("New offer:", data);
    };

    return (
        <div className="flex-1 space-y-6 p-8">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div>
                        <h1 className="text-3xl font-bold">
                            Manage Tuition Offers
                        </h1>
                        <p className="text-muted-foreground">
                            View and respond to tuition requests
                        </p>
                    </div>
                </div>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Create Offer
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader className="px-2">
                            <DialogTitle>Create New Tuition Offer</DialogTitle>
                            <DialogDescription>
                                Fill in the details to create a new tuition
                                offer
                            </DialogDescription>
                        </DialogHeader>
                        <CreateTuitionOfferForm onSubmit={handleCreateOffer} />
                    </DialogContent>
                </Dialog>
            </div>

            <Card>
                <CardContent className="p-6">
                    <div className="flex flex-wrap gap-4">
                        <div className="flex-1 min-w-[200px]">
                            <Input
                                placeholder="Search by subject or student..."
                                className="w-full"
                            />
                        </div>
                        <Select defaultValue="all-status">
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Filter by Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all-status">
                                    All Status
                                </SelectItem>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="accepted">
                                    Accepted
                                </SelectItem>
                                <SelectItem value="rejected">
                                    Rejected
                                </SelectItem>
                                <SelectItem value="expired">Expired</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select defaultValue="all-modes">
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Filter by Mode" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all-modes">
                                    All Modes
                                </SelectItem>
                                <SelectItem value="online">Online</SelectItem>
                                <SelectItem value="in-person">
                                    In-Person
                                </SelectItem>
                                <SelectItem value="hybrid">Hybrid</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Student</TableHead>
                            <TableHead>Subject</TableHead>
                            <TableHead>Budget</TableHead>
                            <TableHead>Mode</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Created</TableHead>
                            <TableHead className="text-right">
                                Actions
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {offers.map((offer) => (
                            <TableRow key={offer.offerId}>
                                <TableCell>{offer.studentName}</TableCell>
                                <TableCell>{offer.subject}</TableCell>
                                <TableCell>
                                    {offer.budget.currency}{" "}
                                    {offer.budget.amount}/
                                    {offer.budget.rateType}
                                </TableCell>
                                <TableCell>
                                    <Badge variant="outline">
                                        {offer.mode === "online" && (
                                            <Monitor className="mr-1 h-3 w-3" />
                                        )}
                                        {offer.mode.charAt(0).toUpperCase() +
                                            offer.mode.slice(1)}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <Badge
                                        variant={getStatusBadgeVariant(
                                            offer.status
                                        )}
                                        className="flex w-fit items-center gap-1"
                                    >
                                        {getStatusIcon(offer.status)}
                                        {offer.status.charAt(0).toUpperCase() +
                                            offer.status.slice(1)}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    {new Date(
                                        offer.createdAt
                                    ).toLocaleDateString()}
                                </TableCell>
                                <TableCell className="text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon">
                                                <Filter className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem>
                                                <Eye className="mr-2 h-4 w-4" />
                                                View Details
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <Edit className="mr-2 h-4 w-4" />
                                                Edit Offer
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="text-destructive">
                                                <Trash2 className="mr-2 h-4 w-4" />
                                                Delete Offer
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>
        </div>
    );
}
