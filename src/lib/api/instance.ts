import api from './handler';

class ApiHandlers {
    handleLogin = async (data: { email: string, password: string }) => {
        return api.post('/login', { data });
    }
    handleLogout = async () => {
        return api.get('/logout');
    }
    handleRegister = async (data: { email: string, password: string,name:string }) => {
        return api.post('/register', { data });
    }
    getAllExpenses = async (dateRange?: { startDate: string, endDate: string }) => {
        return api.get('/get-expense',{
            params: {
                startDate: dateRange?.startDate,
                endDate: dateRange?.endDate
            }
        });
    }
    addNewExpense = async (data: { type: string, category: string, description: string, amount: string, date: string }) => {
        return api.post('/add-new-expense',data);
    }
    updateCurrentExpense = async (id: string, data: { type: string, category: string, description: string, amount: string, date: string }) => {
        return api.put('/add-new-expense/' + id, data);
    }
    deleteExpense = async (id: string) => {
        return api.delete('/expense' + id);
    }
    getSingleExpense = async (id: string) => {
        return api.get('/get-expense/' + id);
    }

    setBudgetLimit = async (data: { amount: string,month:string,year:string }) => {
        return api.post('/set-budget-limit', data);
    }
    getBudget = async (data: {  month:string,year:string }) => {
        return api.post('/get-budget-limit', data);
    }
    updateBudgetLimit = async (id:string,data: { amount: string,month:string,year:string }) => {
        return api.patch('/set-budget-limit/'+id, data);
    }
    addExpenseCategory = async (data: { category: string }) => {
        return api.post('/add-expense-category', data);
    }
    getExpenseCategory = async () => {
        return api.get('/get-expense-category');
    }
    deleteExpenseCategory = async (id: string) => {
        return api.delete('/delete-expense-category/' + id);
    }
    analytics() {
        return api.get('/analytics')
    }
}
export const apiHandlers = new ApiHandlers();