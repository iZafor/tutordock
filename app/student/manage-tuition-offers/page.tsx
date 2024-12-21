"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
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
    Plus,
    Eye,
    Trash2,
    Monitor,
    CheckCircle2,
    XCircle,
    Clock4,
    Clock,
    Ellipsis,
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

interface TuitionOffer {
    offerId: string;
    budget: {
        amount: number;
        rateType: "hourly" | "monthly" | "fixed";
    };
    startDate: string;
    subjects: string[];
    mode: "online" | "in-person" | "hybrid";
    status: "pending" | "accepted" | "rejected" | "expired";
}

const offers: TuitionOffer[] = [
    {
        offerId: "TO-2024-001",
        budget: {
            amount: 50,
            rateType: "hourly",
        },
        startDate: "2024-01-15",
        subjects: ["Mathematics", "Physics"],
        mode: "online",
        status: "pending",
    },
    {
        offerId: "TO-2024-002",
        budget: {
            amount: 400,
            rateType: "monthly",
        },
        startDate: "2024-01-20",
        subjects: ["Physics", "Bangla Literature"],
        mode: "hybrid",
        status: "accepted",
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

export default function ManageTuitionOffers() {
    const router = useRouter();

    return (
        <div className="flex-1 space-y-6">
            <div className="flex justify-end items-center">
                <Button
                    onClick={() =>
                        router.push(
                            "/student/manage-tuition-offers/create-tuition-offer"
                        )
                    }
                >
                    <Plus className="mr-2 h-4 w-4" />
                    Create Offer
                </Button>
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
                            <TableHead>Subject</TableHead>
                            <TableHead>Budget</TableHead>
                            <TableHead>Mode</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Start Date</TableHead>
                            <TableHead className="text-right">
                                Actions
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {offers.map((offer) => (
                            <TableRow key={offer.offerId}>
                                <TableCell>
                                    {offer.subjects.join(", ")}
                                </TableCell>
                                <TableCell>
                                    BDT {offer.budget.amount}/
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
                                        offer.startDate
                                    ).toLocaleDateString()}
                                </TableCell>
                                <TableCell className="text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon">
                                                <Ellipsis className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem>
                                                <Eye className="mr-2 h-4 w-4" />
                                                View Details
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
