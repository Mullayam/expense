import { ExpenseForm } from './expenseForm';
import ExpenseLimitForm from './expenseLimitForm';

const AddExpense = () => {
  return (
    <div className='flex flex-row  gap-4 w-full flex-wrap'>
      <ExpenseForm />
      <ExpenseLimitForm />
    </div>
  )
}

export default AddExpense