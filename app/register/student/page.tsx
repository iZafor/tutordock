"use client";

import { Card, Form, Input, Button } from "@nextui-org/react";
import { useState } from "react";

export default function StudentRegistrationForm() {
    const [password, setPassword] = useState("");
    const [submitted, setSubmitted] = useState(null);
    const [errors, setErrors] = useState({});

    const getPasswordError = (value) => {
        if (value.length < 4) {
            return "Password must be 4 characters or more";
        }
        if ((value.match(/[A-Z]/g) || []).length < 1) {
            return "Password needs at least 1 uppercase letter";
        }
        if ((value.match(/[^a-z]/gi) || []).length < 1) {
            return "Password needs at least 1 symbol";
        }

        return null;
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.currentTarget));

        // Custom validation checks
        const newErrors = {};

        // Password validation
        const passwordError = getPasswordError(data.password);

        if (passwordError) {
            newErrors.password = passwordError;
        }

        // Username validation
        if (data.name === "admin") {
            newErrors.name = "Nice try! Choose a different username";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);

            return;
        }

        if (data.terms !== "true") {
            setErrors({ terms: "Please accept the terms" });

            return;
        }

        // Clear errors and submit
        setErrors({});
        setSubmitted(data);
    };

    return (
        <div className="w-full h-screen flex flex-col gap-4 items-center justify-center">
            <Card className="min-w-[600px] px-8 py-4 space-y-4">
                <div className="text-center">
                    <h2 className="text-2xl font-bold">Student Registration</h2>
                    <p className="text-gray-600 mt-2">
                        Please fill in your information to register
                    </p>
                </div>
                <Form
                    className="w-full justify-center items-center animate-appearance-in"
                    validationBehavior="native"
                    onSubmit={onSubmit}
                    onReset={() => setSubmitted(null)}
                >
                    <div className="w-full flex justify-between gap-2">
                        <Input
                            variant="bordered"
                            isRequired
                            label="First Name"
                            placeholder="Enter your first name"
                            labelPlacement="outside"
                            errorMessage={({ validationDetails }) => {
                                if (validationDetails.valueMissing) {
                                    return "Please enter your first name";
                                }
                                return "";
                            }}
                        />
                        <Input
                            variant="bordered"
                            isRequired
                            label="Last Name"
                            placeholder="Enter your last name"
                            labelPlacement="outside"
                            errorMessage={({ validationDetails }) => {
                                if (validationDetails.valueMissing) {
                                    return "Please enter your last name";
                                }
                                return "";
                            }}
                        />
                    </div>
                    <Input
                        variant="bordered"
                        isRequired
                        label="Email"
                        type="email"
                        placeholder="Enter your email"
                        labelPlacement="outside"
                        errorMessage={({ validationDetails }) => {
                            if (validationDetails.valueMissing) {
                                return "Please enter a valid email address";
                            }
                            return "";
                        }}
                    />
                    <Input
                        variant="bordered"
                        isRequired
                        label="Password"
                        type="password"
                        placeholder="Enter your password"
                        labelPlacement="outside"
                        errorMessage={getPasswordError(password)}
                        isInvalid={getPasswordError(password) !== null}
                        value={password}
                        onValueChange={setPassword}
                    />
                    <Input
                        variant="bordered"
                        isRequired
                        label="Phone Number"
                        placeholder="Enter your phone number"
                        labelPlacement="outside"
                    />
                    <Input
                        variant="bordered"
                        isRequired
                        label="Address"
                        placeholder="Enter your current address"
                        labelPlacement="outside"
                    />
                    <Input
                        variant="bordered"
                        isRequired
                        label="Grade"
                        placeholder="e.g., Class 6, HSC"
                        labelPlacement="outside"
                    />
                    <Input
                        variant="bordered"
                        label="Institution"
                        placeholder="Enter your institution"
                        labelPlacement="outside"
                    />
                    <Button className="w-full" color="primary" type="submit">
                        Register
                    </Button>
                </Form>
            </Card>
        </div>
    );
}
