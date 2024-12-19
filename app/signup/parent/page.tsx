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
    occupation: z.string().optional(),
});

export default function ParentRegistrationForm() {
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
                    <CardTitle>Parent Registration</CardTitle>
                    <CardDescription>
                        Create an account and start managing your child&apos;s
                        activities
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
                            name="occupation"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Occupation</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="Enter your occupation"
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
