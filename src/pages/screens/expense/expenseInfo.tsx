import { FallbackSpinner } from '@/components/common/fallbackSpinner';
import ExpenseCard from './expenseCard';
interface TransactionAnalytics {
  expenseLastMonth: ExpenseLastMonth[];
  expenseThisMonth: ExpenseThisMonth[];
  incomeLastMonth: ExpenseLastMonth[];
  incomeThisMonth: ExpenseThisMonth[];
  netTransaction: ExpenseThisMonth[];
}

interface ExpenseThisMonth {
  total_expense: string;
}

interface ExpenseLastMonth {
  total_expense: null;
}
export function ExpenseInfo({ analytics, isFetching }: { analytics: TransactionAnalytics, isFetching: boolean }) {


  return (
    <div className="pt-8">
      <div className="space-y-8">
        <div className="grid gap-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5">
          {isFetching ? <FallbackSpinner /> : <>
            <ExpenseCard title='Expense Last Month' value={analytics?.expenseLastMonth[0].total_expense || '0'} />
            <ExpenseCard title='Expense This Month' value={analytics?.expenseThisMonth[0].total_expense || '0'} />
            <ExpenseCard title='Income Last Month' value={analytics?.incomeLastMonth[0].total_expense || '0'} />
            <ExpenseCard title='Income This Month' value={analytics?.incomeThisMonth[0].total_expense || '0'} />
            <ExpenseCard title='Net Total Transaction' value={analytics?.netTransaction[0].total_expense || '0'} />
          </>}

        </div>
      </div>
    </div>
  );
}

