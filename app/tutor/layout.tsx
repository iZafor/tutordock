import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import Navbar from "@/components/ui/navbar";
import React from "react";
import { ListItem } from "@/components/ui/list-item";

const ROUTE_ROOT = "/tutor";

const routes = [
    {
        title: "My Tuitions",
        url: ROUTE_ROOT + "/my-tuitions",
    },
    {
        title: "Tuition Opportunities",
        subRoutes: [
            {
                title: "Browse Offers",
                url: ROUTE_ROOT + "/tuition-opportunities",
                description:
                    "Explore available tuition offers matching your expertise and preferences",
            },
            {
                title: "My Applications",
                url: ROUTE_ROOT + "/my-applications",
                description:
                    "Track your offer applications and their current status",
            },
        ],
    },
];

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <span>
            <Navbar className="px-[4rem]">
                <div className="flex gap-4">
                    {routes.map((item) => (
                        <NavigationMenu key={item.url}>
                            <NavigationMenuList>
                                <NavigationMenuItem>
                                    {!item.subRoutes ? (
                                        <Link
                                            href={item.url}
                                            legacyBehavior
                                            passHref
                                        >
                                            <NavigationMenuLink
                                                className={navigationMenuTriggerStyle()}
                                            >
                                                {item.title}
                                            </NavigationMenuLink>
                                        </Link>
                                    ) : (
                                        <>
                                            <NavigationMenuTrigger>
                                                {item.title}
                                            </NavigationMenuTrigger>
                                            <NavigationMenuContent>
                                                <ul className="flex flex-col gap-3 p-4 w-[400px]">
                                                    {item.subRoutes.map(
                                                        (sItem) => (
                                                            <ListItem
                                                                key={sItem.url}
                                                                title={
                                                                    sItem.title
                                                                }
                                                                href={sItem.url}
                                                            >
                                                                {
                                                                    sItem.description
                                                                }
                                                            </ListItem>
                                                        )
                                                    )}
                                                </ul>
                                            </NavigationMenuContent>
                                        </>
                                    )}
                                </NavigationMenuItem>
                            </NavigationMenuList>
                        </NavigationMenu>
                    ))}
                </div>
            </Navbar>
            <div className="px-20">{children}</div>
        </span>
    );
}
