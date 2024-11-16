import { ExpenseForm } from './expenseForm';
import ExpenseLimitForm from './expenseLimitForm';
import { useLocation } from 'react-router-dom';

const AddExpense = () => {
  const location = useLocation()

  return (
    <div className='flex flex-row  gap-4 w-full flex-wrap'>
      <ExpenseForm />
      {!location.state && <ExpenseLimitForm />}
     
    </div>
  )
}

export default AddExpense