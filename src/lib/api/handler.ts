import axios from "axios"
import { __config } from "../config"
import { jwtDecode } from 'jwt-decode'
const api = axios.create({ baseURL: __config.API_URL + "/api/v1" })

export function setAuthorizationHeader(token: string) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`
}
export function getTokenFromLocalStorage() {
    return localStorage.getItem("token") || null
}
const user = getTokenFromLocalStorage()
if (user) {
    const { exp } = jwtDecode(user)
    if (exp && Date.now() < exp * 1000) {
        setAuthorizationHeader(user)
    }
    else {
        localStorage.removeItem("token")
        window.location.href = "/login"
    }

}

export default api