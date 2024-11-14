import { Suspense } from "react"
import { ExpenseInfo } from "../expense/expenseInfo"
import { SpendingCategoriesChart } from "./categoriesChart"
import { FallbackSpinner } from "@/components/common/fallbackSpinner"
import { useQuery } from '@tanstack/react-query';
import { apiHandlers } from "@/lib/api/instance"
import { MonthlyAreaChart } from "./areaChart"

export const Home = () => {
  const { data, isFetching } = useQuery({
    queryKey: ['get-anylytics'],
    queryFn: () => apiHandlers.analytics()
  })


  return (
    <Suspense fallback={<FallbackSpinner />}>
      <ExpenseInfo analytics={data?.data?.result} isFetching={isFetching} />     
      {!isFetching &&  <>
        <SpendingCategoriesChart data={data?.data?.result?.categoryWiseData} />
        <MonthlyAreaChart chartData={data?.data?.result.allData} /></>}
    </Suspense>
  )
}
