import axios from "axios"
import API_URL from "./api-url"

export type Signup = {
    name: string
    rg: string
    email: string
    password: string
}

async function signup(data: Signup){
    const response = await axios.post(`${API_URL}/auth/signup`, data)
    return response
}

const api = {
    signup
}
export default api