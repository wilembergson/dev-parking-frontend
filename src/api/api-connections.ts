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

export type UpdateUser = {
    email?: string
    password?: string
}

async function signup(data: Signup) {
    const response = await axios.post(`${API_URL}/auth/signup`, data)
    return response
}

async function login(data: Login) {
    const response = await axios.post(`${API_URL}/auth/login`, data)
    return response
}

async function validateToken(token: string) {
    return await axios.get(`${API_URL}/auth/valid-token`, {
        headers: {
            authorization: token
        }
    })
}

async function getUserInfo(id: string, token: string) {
    return await axios.get(`${API_URL}/user/${id}`, {
        headers: {
            authorization: token
        }
    })
}

async function updateUser(id: string, token: string, data: UpdateUser) {
    return await axios.put(`${API_URL}/user/${id}`,
        data,
        {
            headers: {
                authorization: token
            }
        })
}

async function listVacancies() {
    return await axios.get(`${API_URL}/vacancy`)
}

const api = {
    signup,
    login,
    validateToken,
    getUserInfo,
    updateUser,
    listVacancies
}
export default api