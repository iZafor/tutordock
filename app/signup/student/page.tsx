"use client";

import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
    firstName: z.string().nonempty(),
    lastName: z.string().nonempty(),
    email: z.string().email(),
    password: z.string().min(6),
    phoneNumber: z.string().length(11),
    address: z.string().nonempty(),
    grade: z.string().nonempty(),
    institution: z.string().optional(),
});

export default function StudentRegistrationForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
    }

    return (
        <div className="w-full flex justify-center mt-12">
            <Card className="min-w-[600px] px-8 py-4 space-y-4">
                <CardHeader className="text-center">
                    <CardTitle>Student Signup</CardTitle>
                    <CardDescription>
                        Please fill in your information to signup
                    </CardDescription>
                </CardHeader>
                <Form {...form}>
                    <form
                        className="w-full space-y-4 animate-appearance-in"
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <div className="w-full flex justify-between gap-2">
                            <FormField
                                control={form.control}
                                name="firstName"
                                render={({ field }) => (
                                    <FormItem className="w-1/2">
                                        <FormLabel>First Name</FormLabel>
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
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="grade"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Grade</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="Enter your grade (e.g. Class 6, SSC, HSC)"
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="institution"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Institution</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="Enter your institution"
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <Button
                            size="lg"
                            className="w-full"
                            color="primary"
                            type="submit"
                        >
                            Signup
                        </Button>
                    </form>
                </Form>
            </Card>
        </div>
    );
}
