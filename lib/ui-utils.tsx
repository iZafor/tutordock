import { Clock4, CheckCircle2, Clock, XCircle, LucideIcon } from "lucide-react";
import { TuitionOffer } from "./types";

export const getStatusBadgeVariant = (status: string) => {
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

export const getStatusIcon = (status: string) => {
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

export type RowAction<T = TuitionOffer> = {
    name: string;
    icon: LucideIcon;
    onClick?: (data: T) => void;
};
