"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileInput, Input } from "@/components/ui/input";
import { MoveLeft, MoveRight } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

const degrees = [
    "Ph.D",
    "Master's Degree",
    "Bachelor's Degree",
    "Higher Secondary School",
    "Secondary School",
    "Other",
] as const;

const experiences = [
    "0-2 years",
    "3-5 years",
    "6-10 years",
    "10+ years",
] as const;

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_FILE_TYPES = ["image/jpeg", "image/png", "application/pdf"];

const formSchema = z.object({
    // page 1
    firstName: z.string().nonempty(),
    lastName: z.string().nonempty(),
    email: z.string().email(),
    password: z.string().min(6),
    phoneNumber: z.string().length(11),
    address: z.string().nonempty(),

    // page 2
    highestDegree: z.enum(degrees),
    specialization: z.string().nonempty(),
    institution: z.string().nonempty(),
    additionalCertifications: z
        .custom<FileList>()
        .transform((file) => file.length > 0 && file.item(0))
        .refine(
            (file) => file && file.size <= MAX_FILE_SIZE,
            "File size should be less than 5MB."
        )
        .refine(
            (file) => file && ACCEPTED_FILE_TYPES.includes(file.type),
            "File type must be .jpg, .png, or .pdf."
        )
        .optional(),

    // page 3
    teachingExperience: z.enum(experiences),
    preferredSubjects: z.string().nonempty(),
});

export default function TutorRegistrationForm() {
    const [page, setPage] = useState(1);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
    }

    return (
        <div className="w-full flex gap-4 flex-col items-center mt-12">
            <div className="space-x-4">
                <Button
                    disabled={page == 1}
                    className="rounded-full"
                    variant="outline"
                    size="icon"
                    onClick={() => setPage((prev) => prev - 1)}
                >
                    <MoveLeft />
                </Button>
                <Button
                    disabled={page == 3}
                    className="rounded-full"
                    variant="outline"
                    size="icon"
                    onClick={() => setPage((prev) => prev + 1)}
                >
                    <MoveRight />
                </Button>
            </div>
            <Card className="min-w-[600px] px-8 py-4 space-y-4">
                <div className="text-center">
                    <h2 className="text-2xl font-bold">Tutor Registration</h2>
                    <p className="text-gray-600 mt-2">
                        Join our teaching community
                    </p>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        {page === 1 && (
                            <div className="min-h-[470px] animate-appearance-in w-full flex flex-col gap-2">
                                <h3 className="text-lg font-semibold">
                                    Personal Information
                                </h3>
                                <div className="w-full flex justify-between gap-2">
                                    <FormField
                                        control={form.control}
                                        name="firstName"
                                        render={({ field }) => (
                                            <FormItem className="w-1/2">
                                                <FormLabel>
                                                    First Name
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        placeholder="Enter your first name"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="lastName"
                                        render={({ field }) => (
                                            <FormItem className="w-1/2">
                                                <FormLabel>Last Name</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        placeholder="Enter your last name"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    type="email"
                                                    placeholder="Enter your email"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    type="password"
                                                    placeholder="Enter your password"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="phoneNumber"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Phone Number</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder="Enter your phone number"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="address"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Address</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder="Enter your address"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        )}

                        {page === 2 && (
                            <div className="min-h-[470px] animate-appearance-in w-full flex flex-col gap-2">
                                <h3 className="text-lg font-semibold">
                                    Educational Qualifications
                                </h3>
                                <div className="w-full flex flex-col gap-4">
                                    <FormField
                                        name="highestDegree"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Highest Degree
                                                </FormLabel>
                                                <Select
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                    defaultValue={field.value}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger className="w-full">
                                                            <SelectValue placeholder="Select highest degree" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {degrees.map((d) => (
                                                            <SelectItem
                                                                key={d}
                                                                value={d}
                                                            >
                                                                {d}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                    <FormMessage />
                                                </Select>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="specialization"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Field of Specialization
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        placeholder="e.g., Mathematics, Physics, Literature"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="institution"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    University/Institution
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        placeholder="Enter name of your institution"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="additionalCertifications"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Additional Certifications
                                                </FormLabel>
                                                <FormControl>
                                                    <FileInput
                                                        accept={ACCEPTED_FILE_TYPES.join(
                                                            ","
                                                        )}
                                                        onChange={(e) => {
                                                            if (
                                                                e.target.files
                                                            ) {
                                                                field.onChange(
                                                                    e.target
                                                                        .files
                                                                );
                                                            }
                                                        }}
                                                        onBlur={field.onBlur}
                                                        name={field.name}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                        )}

                        {page == 3 && (
                            <div className="min-h-[470px] animate-appearance-in w-full flex flex-col gap-2">
                                <h3 className="text-lg font-semibold">
                                    Teaching Experience
                                </h3>
                                <div className="w-full flex flex-col gap-4">
                                    <FormField
                                        name="teachingExperience"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Years of Teaching Experience
                                                </FormLabel>
                                                <Select
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                    defaultValue={field.value}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger className="w-full">
                                                            <SelectValue placeholder="Select years of experience" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {experiences.map(
                                                            (d) => (
                                                                <SelectItem
                                                                    key={d}
                                                                    value={d}
                                                                >
                                                                    {d}
                                                                </SelectItem>
                                                            )
                                                        )}
                                                    </SelectContent>
                                                    <FormMessage />
                                                </Select>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="preferredSubjects"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Subjects You can Teach
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        placeholder="e.g., Mathematics, Physics, Literature"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <Button
                                    className="w-full"
                                    color="primary"
                                    type="submit"
                                >
                                    Signup
                                </Button>
                            </div>
                        )}
                    </form>
                </Form>
            </Card>
        </div>
    );
}
