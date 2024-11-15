import { AppSidebar } from "./_components/app-sidebar"
import { Separator } from "@/components/ui/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useAppSelector } from "@/hooks/use-store"

export function RootLayout() {
    const { user: authUser,limit } = useAppSelector(x => ({user:x.auth, limit: x.auth.limit}));
    const history = useLocation();
    if (!authUser) {
        return <Navigate to="/login" state={{ from: history.pathname }} />
    } 
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-12 shrink-0 items-center gap-2">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator orientation="vertical" className="mr-2 h-4" />
                    </div>
                </header>
                <Separator />
                <div className="flex flex-1 flex-col gap-4 p-4 pt-2">
                    {limit ? <div className="p-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 text-center" role="alert">
                       <span className="font-medium">Your Monthly limit is {limit.amount} Rs.</span>
                     </div>:  (
                       <div className="p-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 text-center" role="alert">
                       <span className="font-medium w-96 bg-blue-800"> </span>
                     </div>
                    )}
                    <Outlet />
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
