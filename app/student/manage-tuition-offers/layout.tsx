"use client";

import React from "react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import { slugToTitleCase } from "@/lib/utils";
import { Slash } from "lucide-react";

export default function Layout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const paths = pathname.split("/");
    const subPathRoot = paths.slice(0, 2).join("/");
    const subPaths = paths.slice(2);

    return (
        <span className="block mt-6">
            <Breadcrumb className="mb-4">
                <BreadcrumbList>
                    {subPaths.slice(0, subPaths.length - 1).map((p, idx) => (
                        <span key={p + idx} className="flex items-center gap-2">
                            <BreadcrumbItem>
                                <BreadcrumbLink href={subPathRoot + "/" + p}>
                                    {slugToTitleCase(p)}
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator>
                                <Slash />
                            </BreadcrumbSeparator>
                        </span>
                    ))}
                    <BreadcrumbItem>
                        <BreadcrumbPage>
                            {slugToTitleCase(subPaths[subPaths.length - 1])}
                        </BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            {children}
        </span>
    );
}
