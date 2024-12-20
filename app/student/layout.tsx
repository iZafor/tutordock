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
} from "@/components/ui/sidebar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BookMarked, ChevronsUpDown, Home, LineChart } from "lucide-react";
import Link from "next/link";

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
                            <SidebarMenu>
                                {items.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild>
                                            <Link href={item.url}>
                                                <item.icon />
                                                <span>{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
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
                                            <AvatarFallback>CN</AvatarFallback>
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
            <main>
                <SidebarTrigger />
                {children}
            </main>
        </SidebarProvider>
    );
}
