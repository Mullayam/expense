import { AppSidebar } from "./_components/app-sidebar"
import { Separator } from "@/components/ui/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "@/hooks/use-store"
import { useToast } from "@/hooks/use-toast"
import React from "react"
import { apiHandlers } from '../../lib/api/instance';
import { setLimit, setTotalExpense } from "@/store/slices/auth.actions"

export function RootLayout() {
    const { toast } = useToast();
    const dispatch = useAppDispatch()
    const { user: authUser, limit, totalExpense } = useAppSelector(x => ({ user: x.auth, limit: x.auth.limit, totalExpense: x.auth.totalExpense }));
    const history = useLocation();

    const fetchUser = React.useCallback(async () => {
        const { data } = await apiHandlers.fetchUser();
        if (!data.success) {
            return
        }
        dispatch(setLimit(data.result.budget_limit))
        dispatch(setTotalExpense(data.result.total_expense))
    }, [dispatch])


    React.useEffect(() => {
        if (Number(totalExpense) > Number(limit?.amount)) {
            toast({ title: "Monthly Limit Exceeded", description: "You have exceeded your monthly limit by Rs." + (Number(totalExpense) - Number(limit?.amount)), variant: "destructive" })
        }


    }, [authUser.user, fetchUser, limit?.amount, toast, totalExpense])

    React.useEffect(() => {
        if (authUser.user) fetchUser()

    }, [authUser.user, fetchUser])


    if (!authUser.user) {
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

                    {limit && limit?.amount ? <div className="p-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 text-center" role="alert">
                        {Number(totalExpense) > Number(limit?.amount) && (
                            <span className="font-medium text-red-500">You have exceeded your monthly limit by  Rs.{Number(totalExpense) - Number(limit?.amount)}.</span>
                        )}
                        <span className="font-medium">Your Monthly limit is Rs.{limit.amount} </span>
                    </div> : (
                        <div className="p-4 text-sm text-red-500 rounded-lg bg-blue-50 dark:bg-red-800 dark:text-red-400 text-center" role="alert">
                            <span className="font-medium w-96 ">You have not set your monthly limit,Please set your monthly limit </span>
                        </div>
                    )}
                    <Outlet />
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
