"use client";

import {
    Card,
    Form,
    Input,
    Button,
    Select,
    SelectItem,
} from "@nextui-org/react";
import { MoveLeft, MoveRight } from "lucide-react";
import { useState } from "react";

const degrees = [
    "Ph.D.",
    "Master's Degree",
    "Bachelor's Degree",
    "Higher Secondary School",
    "Secondary School",
];

const experiences = ["0-2 years", "3-5 years", "6-10 years", "10+ years"];

export default function TutorRegistrationForm() {
    const [password, setPassword] = useState("");
    const [submitted, setSubmitted] = useState(null);
    const [errors, setErrors] = useState({});
    const [page, setPage] = useState(1);

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
            <div className="space-x-4">
                <Button
                    isIconOnly
                    isDisabled={page == 1}
                    className="rounded-full"
                    variant="bordered"
                    size="md"
                    onPress={() => setPage((prev) => prev - 1)}
                >
                    <MoveLeft />
                </Button>
                <Button
                    isIconOnly
                    isDisabled={page == 3}
                    className="rounded-full"
                    variant="bordered"
                    size="md"
                    onPress={() => setPage((prev) => prev + 1)}
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
                <Form
                    className="w-full justify-center items-center"
                    validationBehavior="native"
                    onSubmit={onSubmit}
                    onReset={() => setSubmitted(null)}
                >
                    {page === 1 && (
                        <div className="min-h-[470px] animate-appearance-in w-full flex flex-col gap-2">
                            <h3 className="text-lg font-semibold">
                                Personal Information
                            </h3>
                            <div className="w-full flex flex-col gap-4">
                                <div className="flex justify-between gap-2">
                                    <Input
                                        variant="bordered"
                                        isRequired
                                        label="First Name"
                                        placeholder="Enter your first name"
                                        labelPlacement="outside"
                                        errorMessage={({
                                            validationDetails,
                                        }) => {
                                            if (
                                                validationDetails.valueMissing
                                            ) {
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
                                        errorMessage={({
                                            validationDetails,
                                        }) => {
                                            if (
                                                validationDetails.valueMissing
                                            ) {
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
                                    isInvalid={
                                        getPasswordError(password) !== null
                                    }
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
                            </div>
                        </div>
                    )}

                    {page === 2 && (
                        <div className="min-h-[470px] animate-appearance-in w-full flex flex-col gap-2">
                            <h3 className="text-lg font-semibold">
                                Educational Qualifications
                            </h3>
                            <div className="w-full flex flex-col gap-4">
                                <Select
                                    variant="bordered"
                                    isRequired
                                    label="Highest Degree"
                                    labelPlacement="outside"
                                    placeholder="Select highest degree"
                                >
                                    {degrees.map((d) => (
                                        <SelectItem key={d}>{d}</SelectItem>
                                    ))}
                                </Select>
                                <Input
                                    variant="bordered"
                                    label="Field of Specialization"
                                    placeholder="e.g., Mathematics, Physics, Literature"
                                    labelPlacement="outside"
                                />
                                <Input
                                    variant="bordered"
                                    isRequired
                                    label="University/Institution"
                                    placeholder="Enter name of your institution"
                                    labelPlacement="outside"
                                />
                                <Input
                                    variant="bordered"
                                    type="file"
                                    label="Additional Certifications"
                                    labelPlacement="outside"
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
                                <Select
                                    variant="bordered"
                                    isRequired
                                    label="Years of Teaching Experience"
                                    labelPlacement="outside"
                                    placeholder="Select years of experience"
                                >
                                    {experiences.map((e) => (
                                        <SelectItem key={e}>{e}</SelectItem>
                                    ))}
                                </Select>
                                <Input
                                    variant="bordered"
                                    isRequired
                                    label="Subjects You can Teach"
                                    placeholder="e.g., Mathematics, Physics, Literature"
                                    labelPlacement="outside"
                                />
                            </div>
                            <Button
                                className="w-full"
                                color="primary"
                                type="submit"
                            >
                                Register
                            </Button>
                        </div>
                    )}
                </Form>
            </Card>
        </div>
    );
}
