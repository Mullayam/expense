import { FallbackSpinner } from "@/components/common/fallbackSpinner"
import { Login } from "@/pages/auth/login"
import { RootLayout } from "@/pages/dashboard/layout"
import Notfound2 from "@/pages/error/notfound"
import AddExpense from "@/pages/screens/expense/addExpense"
import { ExpenseCategoryManager } from "@/pages/screens/expense/addExpenseCateogry"
import { AllExpenseList } from "@/pages/screens/expense/allExpensesList"
import { Home } from "@/pages/screens/home"
import IncomeSourceForm from "@/pages/screens/income/add-income"
import { Suspense } from "react"
import { createBrowserRouter } from "react-router-dom"

export const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/",
        element: (<Suspense fallback={<FallbackSpinner />}>
            <RootLayout />
        </Suspense>),
        errorElement: <FallbackSpinner />,
        children: [
            {
                path: "",
                element: <Home />
            },
            {
                path: "all-expenses",
                element: <AllExpenseList />
            },
            {
                path: "add-new-expense",
                element: <AddExpense />
            },

            {
                path: "add-new-expense-cateogry",
                element: <ExpenseCategoryManager />
            },
            {
                path: "add-new-income",
                element: <IncomeSourceForm />
            }
        ]
    },
    {
        path: "*",
        element: <Notfound2 />
    },
])