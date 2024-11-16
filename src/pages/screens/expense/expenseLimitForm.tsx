/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { apiHandlers } from '@/lib/api/instance';
import { useToast } from '@/hooks/use-toast';
import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { setLimit } from '@/store/slices/auth.actions';
import { useAppDispatch, useAppSelector } from '../../../hooks/use-store';

interface BudgetFormData {
  budget: string;
}



const ExpenseLimitForm: React.FC = () => {
  const dispatch = useAppDispatch()
  const limit = useAppSelector(x => x.auth.limit);
  const { toast } = useToast()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BudgetFormData>();
  const { data: budgetData, isFetching } = useQuery({
    queryKey: ["budget"],
    queryFn: async () => apiHandlers.getBudget({
      month: (new Date().getMonth() + 1).toString(),
      year: new Date().getFullYear().toString()
    }),
  })
  const onSubmit = async (value: BudgetFormData) => {
    try {
      const newData = {
        amount: value.budget,
        month: (new Date().getMonth() + 1).toString(),
        year: new Date().getFullYear().toString()
      }
      if (budgetData?.data?.result) {
        const { data } = await apiHandlers.updateBudgetLimit(budgetData?.data?.result.id, newData)
        if (!data.success) {
          throw new Error(data.message)
        }
        dispatch(setLimit({
          amount: value.budget,
          current_month: (new Date().getMonth() + 1).toString(),
          current_year: new Date().getFullYear().toString()
        }))
        toast({ title: data.message, variant: "default" })
        return
      }
      const { data } = await apiHandlers.setBudgetLimit(newData)
      if (!data.success) {
        throw new Error(data.message)
      }
      toast({ title: data.message, variant: "default" })
      dispatch(setLimit({
        amount: value.budget,
        current_month: (new Date().getMonth() + 1).toString(),
        current_year: new Date().getFullYear().toString()
      }))

    } catch (error: any) {
      toast({ title: error.message, variant: "destructive" })
    }
  }
 
  return (
    <Card className='w-[48%]'>
      <CardHeader>
        <CardTitle className="text-sm font-semibold text-purple-600">Budget Limit</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="budget"
              className="block text-sm font-medium text-gray-500"
            >
              Enter your budget <span className="text-blue-400">*</span>
            </label>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                Rs.
              </div>
              <input
                type="number"
                id="budget"
                placeholder="5000"
                className="block w-full pl-10 pr-4 py-3   border border-gray-700 rounded-lg 
                     text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 
                     focus:ring-blue-500 focus:border-transparent transition-colors"
                {...register('budget', {
                  required: 'Budget is required',
                  min: { value: 0, message: 'Budget must be positive' },
                  value:limit?.amount|| "1000",
                  pattern: { value: /^\d+$/, message: 'Please enter a valid number' }
                })}
              />
            </div>

            {errors.budget && (
              <p className="text-red-400 text-sm mt-1">
                {errors.budget.message}
              </p>
            )}
          </div>
          <small className="flex items-center text-gray-400">
            By Default your budget is set to Rs. 1000
          </small>
          <button
            disabled={isFetching}
            type="submit"
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg text-center font-medium
                 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 
                 focus:ring-offset-2 focus:ring-offset-gray-900 transition-colors"
          >
            {isFetching ? <Loader2 className="mr-2 h-4 w-4 animate-spin text-center" /> : limit?.amount ? 'Update Expense Limit' : 'Set Expense Limit'}
          </button>
        </form>
      </CardContent>
    </Card>
  );
};
export default ExpenseLimitForm