import axios from "axios"
import API_URL from "./api-url"
import { data } from "autoprefixer"

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

export type SaveCustomerData = {
    name: string
    rg: string
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

async function getCustomer(rg: string, token: string) {
    return await axios.get(`${API_URL}/customer/${rg}`,
        {
            headers: {
                authorization: token
            }
        })
}

async function saveCustomer(data: SaveCustomerData, token: string) {
    return await axios.post(`${API_URL}/customer`,
        data,
        {
            headers: {
                authorization: token
            }
        })
}

const api = {
    signup,
    login,
    validateToken,
    getUserInfo,
    updateUser,
    listVacancies,
    getCustomer,
    saveCustomer
}
export default api