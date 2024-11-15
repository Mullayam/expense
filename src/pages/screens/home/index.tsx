/* eslint-disable @typescript-eslint/no-explicit-any */
import { Suspense } from "react"
import { ExpenseInfo } from "../expense/expenseInfo"
import { SpendingCategoriesChart } from "./categoriesChart"
import { FallbackSpinner } from "@/components/common/fallbackSpinner"
import { useQuery } from '@tanstack/react-query';
import { apiHandlers } from "@/lib/api/instance"
import { MonthlyAreaChart } from "./areaChart"
import { useAppSelector } from "@/hooks/use-store";
import { ScrollArea } from "@/components/ui/scroll-area";
import MonthlyLineChart from "./monthlyLineChart";
interface RootObject {
  created_at: string;
  amount: number;
  type: string;
  category: Category;
}

interface Category {
  name: string;
}
export const Home = () => {
  const { data, isFetching } = useQuery({
    queryKey: ['get-anylytics'],
    queryFn: () => apiHandlers.analytics()
  })
  const limit = useAppSelector(x => x.auth.limit)
  const getTotalAmountByCategory = (data: RootObject[]) => {
    return data.reduce((acc: any, item: any) => {
      if (!acc[item.category.name]) {
        acc[item.category.name] = { name: item.category.name, amount: 0 };
      }
      acc[item.category.name].amount += item.amount;
      return acc;
    }, {});
  };
  return (
    <Suspense fallback={<FallbackSpinner />}>
      <ExpenseInfo analytics={data?.data?.result} isFetching={isFetching} />
      {!isFetching && <>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <SpendingCategoriesChart data={getTotalAmountByCategory(data?.data?.result?.categoryWiseData)} />
          <div className="space-y-2">
            <ScrollArea className="h-[250px]">
              {Object.values(getTotalAmountByCategory(data?.data?.result?.categoryWiseData)).map((item: any) => ({
                ...item,
                percentage: ((item.amount / Number(limit?.amount)) * 100).toFixed(2),

              })).map((item) => (
                <div key={item.name} className="space-y-2 rounded-md p-2 shadow-md">
                  <b>{item.percentage}</b> % of monthly Limit, spent on <b>{item.name}</b>
                </div>
              ))}
            </ScrollArea>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <MonthlyLineChart data={data?.data?.result.allData} expenseLimit={Number(limit?.amount)} />
          <MonthlyAreaChart chartData={data?.data?.result.allData}  expenseLimit={Number(limit?.amount)}/>
        </div>

      </>}
    </Suspense>
  )
}
