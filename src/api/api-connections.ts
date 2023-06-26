import axios from "axios"
import API_URL from "./api-url"

export type Signup = {
    name: string
    rg: string
    email: string
    password: string
}

export type Login = {
    email: string
    password: string
}

async function signup(data: Signup){
    const response = await axios.post(`${API_URL}/auth/signup`, data)
    return response
}

async function login(data: Login){
const response = await axios.post(`${API_URL}/auth/login`, data)
return response
}

const api = {
    signup,
    login
}
export default api