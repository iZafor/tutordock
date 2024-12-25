"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Plus, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { tuitionOfferMockData as offers } from "@/lib/data";
import TuitionOfferTable from "@/components/student/manage-tuition-offers/tuition-offer-table";
import TuitionOfferDateRangeFilter from "@/components/student/manage-tuition-offers/tuition-offer-date-range-filter";
import TuitionOfferWeekdayFilter from "@/components/student/manage-tuition-offers/tuition-offer-weekday-filter";
import TuitionOfferTimeRangeFilter from "@/components/student/manage-tuition-offers/tuition-offer-time-range-filter";
import TuitionOfferStatusFilter from "@/components/student/manage-tuition-offers/tuition-offer-status-filter";
import TuitionOfferModeFilter from "@/components/student/manage-tuition-offers/tuition-offer-mode-filter";

export default function ManageTuitionOffers() {
    const pathname = usePathname();
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all-status");
    const [modeFilter, setModeFilter] = useState("all-modes");

    // Date range filter
    const [dateRange, setDateRange] = useState<{
        from: Date | undefined;
        to: Date | undefined;
    }>({
        from: undefined,
        to: undefined,
    });

    // Schedule filters
    const [selectedWeekdays, setSelectedWeekdays] = useState<string[]>([]);
    const [timeRange, setTimeRange] = useState<{
        start: string;
        end: string;
    }>({
        start: "",
        end: "",
    });

    // Filter the offers based on all criteria
    const filteredOffers = offers.filter((offer) => {
        // Search filter
        const searchMatch =
            searchQuery === "" ||
            offer.subjects.some((subject) =>
                subject.toLowerCase().includes(searchQuery.toLowerCase())
            );

        // Status filter
        const statusMatch =
            statusFilter === "all-status" || offer.status === statusFilter;

        // Mode filter
        const modeMatch =
            modeFilter === "all-modes" || offer.mode === modeFilter;

        // Date range filter
        const dateMatch =
            !dateRange.from ||
            !dateRange.to ||
            (new Date(offer.startDate) >= dateRange.from &&
                new Date(offer.startDate) <= dateRange.to);

        // Weekday filter
        const weekdayMatch =
            selectedWeekdays.length === 0 ||
            selectedWeekdays.some((day) =>
                offer.schedule.weekdays.includes(day)
            );

        // Time range filter
        const timeMatch =
            !timeRange.start ||
            !timeRange.end ||
            (offer.schedule.startTime >= timeRange.start &&
                offer.schedule.endTime <= timeRange.end);

        return (
            searchMatch &&
            statusMatch &&
            modeMatch &&
            dateMatch &&
            weekdayMatch &&
            timeMatch
        );
    });

    // Clear all filters
    const clearFilters = () => {
        setSearchQuery("");
        setStatusFilter("all-status");
        setModeFilter("all-modes");
        setDateRange({ from: undefined, to: undefined });
        setSelectedWeekdays([]);
        setTimeRange({ start: "", end: "" });
    };

    return (
        <div className="flex-1 space-y-6">
            <div className="flex justify-end items-center">
                <Button
                    onClick={() =>
                        router.push(pathname + "/create-tuition-offer")
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
                                placeholder="Search by subject..."
                                className="w-full"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        <TuitionOfferDateRangeFilter
                            dateRange={dateRange}
                            setDateRange={setDateRange}
                        />

                        <TuitionOfferWeekdayFilter
                            selectedWeekdays={selectedWeekdays}
                            setSelectedWeekdays={setSelectedWeekdays}
                        />

                        <TuitionOfferTimeRangeFilter
                            timeRange={timeRange}
                            setTimeRange={setTimeRange}
                        />

                        <TuitionOfferStatusFilter
                            statusFilter={statusFilter}
                            setStatusFilter={setStatusFilter}
                        />

                        <TuitionOfferModeFilter
                            modeFilter={modeFilter}
                            setModeFilter={setModeFilter}
                        />

                        <Button
                            variant="ghost"
                            onClick={clearFilters}
                            className="px-2 hover:bg-transparent hover:text-destructive"
                        >
                            <X className="h-4 w-4" />
                            Clear filters
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <TuitionOfferTable offers={filteredOffers} />
            </Card>
        </div>
    );
}
