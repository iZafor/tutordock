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

export default function Layout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const paths = pathname.split("/");
    const subPathRoot = paths.slice(0, 2).join("/");
    const subPaths = paths.slice(2);

    return (
        <div className="p-8">
            <Breadcrumb className="mb-4">
                <BreadcrumbList>
                    {subPaths.slice(0, subPaths.length - 1).map((p, idx) => (
                        <span key={p + idx} className="flex items-center gap-2">
                            <BreadcrumbItem>
                                <BreadcrumbLink
                                    href={subPathRoot + "/" + p}
                                    className="text-lg"
                                >
                                    {slugToTitleCase(p)}
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                        </span>
                    ))}
                    <BreadcrumbItem>
                        <BreadcrumbPage className="text-lg">
                            {slugToTitleCase(subPaths[subPaths.length - 1])}
                        </BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            {children}
        </div>
    );
}
