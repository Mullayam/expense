import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IUser } from "@/types"
import { getTokenFromLocalStorage } from "@/lib/api/handler"
import { jwtDecode } from "jwt-decode"
let user: IUser | null;
const token = getTokenFromLocalStorage()
const payload: IUser | null = token ? jwtDecode(token) : null

const getLimit = localStorage.getItem("limit") ? JSON.parse(localStorage.getItem("limit") as string) : null
const totalExpense = localStorage.getItem("totalExpense") ? localStorage.getItem("totalExpense") : null
if (!payload) {
    user = null
} else {
    user = {
        id: payload.id,
        email: payload.email,
        name: payload.name,
    }
}
const limit = getLimit as InitialState["limit"]
type InitialState = {
    user: IUser | null
    token: string | null
    loading: boolean
    error: string | null
    totalExpense: string | null
    limit: {
        month: string
        year: string
        amount: string
    } | null
}
const initialState: InitialState = {
    user: user || null,
    token: token || null,
    error: null,
    loading: false,
    totalExpense: totalExpense,
    limit: limit || null
}
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload
            return state
        },
        setUser: (state, action: PayloadAction<{ user: IUser, token: string }>) => {
            state.user = action.payload.user
            state.token = action.payload.token
            return state
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload
            return state
        },
        setTotalExpense: (state, action: PayloadAction<string>) => {
            state.totalExpense = action.payload
            localStorage.setItem("totalExpense", action.payload?.toString())
            return state
        },
        setUserLogout: (state) => {
            localStorage.removeItem("token")
            localStorage.removeItem("totalExpense")
            localStorage.removeItem("limit")
            state.user = null
            return state
        },
        setLimit: (state, action: PayloadAction<{ month: string, year: string, amount: string }>) => {
            const filteredPayload = {
                month: action.payload.month,
                year: action.payload.year,
                amount: action.payload.amount
            }
            localStorage.setItem("limit", JSON.stringify(filteredPayload))

            state.limit = filteredPayload
            return state
        }
    },

})
export const { setLoading } = authSlice.actions
export default authSlice.reducer