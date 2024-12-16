"use client";

import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/popover";
import { Button } from "@nextui-org/button";
import { Form, Input } from "@nextui-org/react";
import { useState } from "react";

export default function LoginForm() {
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

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);

            return;
        }

        // Clear errors and submit
        setErrors({});
        setSubmitted(data);
    };

    return (
        <Popover className="border border-default rounded-2xl" placement="bottom-end">
            <PopoverTrigger>
                <Button variant="bordered">Login</Button>
            </PopoverTrigger>
            <PopoverContent>
                <Form
                    validationBehavior="native"
                    validationErrors={errors}
                    onReset={() => setSubmitted(null)}
                    onSubmit={onSubmit}
                    className="p-4"
                >
                    <Input
                        isRequired
                        label="Email"
                        labelPlacement="outside"
                        placeholder="Enter your email"
                        type="email"
                        variant="bordered"
                        errorMessage={({ validationDetails }) => {
                            if (validationDetails.valueMissing) {
                                return "Please enter your email";
                            }
                            if (validationDetails.typeMismatch) {
                                return "Please enter a valid email address";
                            }
                        }}
                    />
                    <Input
                        isRequired
                        label="Password"
                        labelPlacement="outside"
                        placeholder="Enter your password"
                        type="password"
                        variant="bordered"
                        errorMessage={getPasswordError(password)}
                        isInvalid={getPasswordError(password) !== null}
                        value={password}
                        onValueChange={setPassword}
                    />
                    <Button type="submit" className="w-full bg-primary">
                        Login
                    </Button>
                </Form>
            </PopoverContent>
        </Popover>
    );
}
