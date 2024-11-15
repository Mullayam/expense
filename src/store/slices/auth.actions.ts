import { IUser } from "@/types"

export const setLoading = (loading: boolean) => ({ type: 'auth/setLoading', payload: loading }) as const
export const setLimit = (limit: { current_month: string,current_year: string, amount: string }) => ({ type: 'auth/setLimit', payload: limit }) as const
export const loginUser = (user: IUser, token: string) => ({ type: 'auth/setUser', payload: { user, token } }) as const
export const logoutUser = () => ({ type: 'auth/setUser', payload: { user: null, token: null } }) as const
export const setError = (error: string | null) => ({ type: 'auth setError', payload: error }) as const