/* eslint-disable @typescript-eslint/no-explicit-any */
import { getRandomColor } from "@/lib/utils";
import { LabelList, Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import moment from "moment";
interface RootObject {
  created_at: string;
  amount: number;
  type: string;
  category: Category;
}

interface Category {
  name: string;
}
export function SpendingCategoriesChart({ data }: { data: RootObject[] }) {
  const getTotalAmountByCategory = (data: RootObject[]) => {
    return data.reduce((acc: any, item: any) => {
      if (!acc[item.category.name]) {
        // If category not in accumulator, initialize it with the current item's amount
        acc[item.category.name] = { name: item.category.name, amount: 0 };
      }
      // Add the amount to the existing category total
      acc[item.category.name].amount += item.amount;
      return acc;
    }, {});
  };
  const totalAmounts = getTotalAmountByCategory(data);


  const currentMonthFoodExpenses = Object.values(totalAmounts)
    .filter((item: any) => moment(item.created_at).isSame(moment(), "month"))
    .map((item: any) => ({ name: item.name, amount: item.amount }));
  const chartConfig: any = {};
  currentMonthFoodExpenses.forEach((item) => {
    if (!chartConfig[item.name]) {
      chartConfig[item.name] = {
        label: item.name,
        fill: getRandomColor(),
      };
    }
  });

  const chartData = currentMonthFoodExpenses.map((item) => ({
    name: item.name,
    amount: item.amount,
    fill: getRandomColor(),
  }));
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle><h1> Top Spending Categories</h1></CardTitle>
        <CardDescription>
          {moment().format("MMM-YYYY")}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px] [&_.recharts-text]:fill-background"
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="amount" hideLabel />}
            />
            <Pie data={chartData} dataKey="amount">
              <LabelList
                dataKey="name"
                className="fill-background"
                stroke="none"
                fontSize={12}
                formatter={(value: string) => chartConfig[value]?.label}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Showing total spending for Food in the current month
        </div> </CardFooter>
    </Card>
  );
}
