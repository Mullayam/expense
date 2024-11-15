import * as React from "react"
import {
    Bot,
    Command,
    Send,
    SquareTerminal,
} from "lucide-react"

import { NavMain } from "./nav-main"
import { NavSecondary } from "./nav-secondary"
import { NavUser } from "./nav-user"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {

    navMain: [
        {
            title: "Expense",
            url: "/",
            icon: SquareTerminal,
            isActive: true,
            items: [
                {
                    title: "All Expenses",
                    url: "all-expenses",
                },
                {
                    title: "Add Expense",
                    url: "add-new-expense",
                },
                {
                    title: "Add Expense Category",
                    url: "add-new-expense-cateogry",
                },

            ],
        },
        {
            title: "Income",
            url: "#",
            icon: Bot,
            items: [
                {
                    title: "Add Income", url: "add-new-income",

                },


            ],
        }


    ],
    navSecondary: [
        {
            title: "Github",
            url: "#",
            icon: Send,
        },

    ],

}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar variant="inset" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <a href="#">
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                    <Command className="size-4" />
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">Expense Tracker</span>
                                    <span className="truncate text-xs">@enjoys</span>
                                </div>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
                <NavSecondary items={data.navSecondary} className="mt-auto" />
            </SidebarContent>
            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    )
}
