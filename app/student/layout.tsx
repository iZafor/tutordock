"use client";

import {
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarTrigger,
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenuSubItem,
    SidebarMenuSubButton,
    SidebarMenuSub,
} from "@/components/ui/sidebar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    BookMarked,
    ChevronRight,
    ChevronsUpDown,
    ClipboardList,
    ClipboardPlus,
    Home,
    LineChart,
} from "lucide-react";
import Link from "next/link";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState } from "react";

const ROUTE_ROOT = "/student";

const items = [
    {
        title: "Dashboard",
        url: ROUTE_ROOT,
        icon: Home,
    },
    {
        title: "My Tuitions",
        url: ROUTE_ROOT + "/tuitions",
        icon: BookMarked,
    },
    {
        title: "Manage Tuition Offers",
        url: ROUTE_ROOT + "/manage-tuition-offers",
        icon: ClipboardList,
        subMenu: [
            {
                title: "Create Tuition Offers",
                url:
                    ROUTE_ROOT +
                    "/manage-tuition-offers" +
                    "/create-tuition-offer",
                icon: ClipboardPlus,
            },
        ],
    },
    {
        title: "Progress",
        url: ROUTE_ROOT + "/progress",
        icon: LineChart,
    },
];

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <Sidebar collapsible="icon">
                <SidebarHeader />
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupContent>
                            {items.map((item) => (
                                <CollapsibleMenuItem
                                    key={item.title + "-c"}
                                    item={item}
                                />
                            ))}
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
                <SidebarFooter>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <SidebarMenuButton
                                        variant="outline"
                                        className="py-6"
                                    >
                                        <Avatar>
                                            <AvatarImage src="https://github.com/shadcn.png" />
                                            <AvatarFallback>BG</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <h3 className="font-semibold">
                                                Boogeyman
                                            </h3>
                                            <p className="text-sm text-foreground">
                                                boogeyman@hunter.com
                                            </p>
                                        </div>
                                        <ChevronsUpDown className="ml-auto" />
                                    </SidebarMenuButton>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    side="right"
                                    align="end"
                                    className="w-[--radix-popper-anchor-width]"
                                >
                                    <DropdownMenuItem>
                                        <span>Account</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <span>Sign out</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarFooter>
            </Sidebar>
            <main className="w-full">
                <SidebarTrigger />
                {children}
            </main>
        </SidebarProvider>
    );
}

function CollapsibleMenuItem({ item }: { item: (typeof items)[0] }) {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <SidebarMenu title={item.title}>
            <Collapsible
                open={isOpen}
                onOpenChange={setIsOpen}
                className="group/collapsible"
            >
                <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                        <SidebarMenuButton asChild>
                            <Link href={item.url}>
                                <item.icon />
                                <span>{item.title}</span>
                                {item.subMenu && (
                                    <ChevronRight
                                        className={`mx-auto mr-0 transition-transform duration-200 ${
                                            isOpen ? "rotate-90" : ""
                                        }`}
                                    />
                                )}
                            </Link>
                        </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                        {item.subMenu && (
                            <SidebarMenuSub>
                                {item.subMenu.map((sub) => (
                                    <SidebarMenuSubItem key={sub.title}>
                                        <SidebarMenuSubButton asChild>
                                            <Link href={sub.url}>
                                                <sub.icon />
                                                <span>{sub.title}</span>
                                            </Link>
                                        </SidebarMenuSubButton>
                                    </SidebarMenuSubItem>
                                ))}
                            </SidebarMenuSub>
                        )}
                    </CollapsibleContent>
                </SidebarMenuItem>
            </Collapsible>
        </SidebarMenu>
    );
}
