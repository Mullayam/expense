import { IUser } from "@/types"

export const setLoading = (loading: boolean) => ({ type: 'auth/setLoading', payload: loading }) as const
export const setLimit = (limit: { current_month: string,current_year: string, amount: string }) => ({ type: 'auth/setLimit', payload: limit }) as const
export const setTotalExpense = (amount:number) => ({ type: 'auth/setTotalExpense', payload: amount }) as const
export const loginUser = (user: IUser, token: string) => ({ type: 'auth/setUser', payload: { user, token } }) as const
export const logoutUser = () => ({ type: 'auth/setUserLogout' }) as const
export const setError = (error: string | null) => ({ type: 'auth setError', payload: error }) as const