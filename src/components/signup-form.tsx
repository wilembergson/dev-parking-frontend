import Title from "./title";
import Input from "./input";
import FormButtom from "./form-butom";
import { useState } from "react";
import api from "@/api/api-connections";
import { errorToast } from "@/utils/toasts";
import { ToastContainer } from "react-toastify";

export default function SignupForm({ setForm }: any) {
    const initialData: Signup = {
        name: '',
        rg: '',
        email: '',
        password: ''
    }
    const [formData, setFormData] = useState(initialData)
    const [loading, setLoading] = useState(false)

    function handleChange({ target }: any) {
        setFormData({ ...formData, [target.name]: target.value })
    }

    async function handleSubmit(e: any) {
        e.preventDefault()
        setLoading(true)
        const user = { ...formData }
        try {
            const res = await api.signup(user)
            alert(res.data)
            console.log(res.data)
            //setForm('login')
            //sucessMessage(data.message)
            //setTimeout(() => navigation('/'), 3000)
        } catch (error: any) {
            setLoading(false)
            const errorMessage = (
                (error.response.data.message.message)
                    ? error.response.data.message.message[0]
                    : error.response.data.message
            )
            errorToast(errorMessage)
        }
    }

    return (
        <div className="flex relative flex-col bg-slate-100 xl:w-6/12 w-full  py-16 rounded-3xl items-center" data-aos="flip-left">


            <Title textColor="text-gray-500" textSize="text-4xl" textBlack>
                Novo usuário
            </Title>
            <form onSubmit={handleSubmit} className="flex flex-col items-center w-full mt-10 font-principal">
                <Input
                    placehoder="nome"
                    type="text"
                    onChange={(e: any) => handleChange(e)}
                    name="name"
                    value={formData.name}
                />
                <Input
                    placehoder="RG"
                    type="number"
                    onChange={(e: any) => handleChange(e)}
                    name="rg"
                    value={formData.rg}
                />
                <Input
                    placehoder="email"
                    type="email"
                    onChange={(e: any) => handleChange(e)}
                    name="email"
                    value={formData.email}
                />
                <Input
                    type="password"
                    placehoder="senha"
                    onChange={(e: any) => handleChange(e)}
                    name="password"
                    value={formData.password}
                />
                <h3 onClick={() => setForm('login')} className="flex mt-10 text-gray-500 font-black cursor-pointer hover:text-yellow duration-500">
                    Fazer login
                </h3>
                <FormButtom>
                    Registrar
                </FormButtom>

            </form>
        </div>
    )
}

type Signup = {
    name: string
    rg: string
    email: string
    password: string
}