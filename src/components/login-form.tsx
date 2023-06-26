import Title from "./title";
import { TfiEmail } from 'react-icons/tfi'
import { AiFillLock } from 'react-icons/ai'
import FormButtom from "./form-butom";
import { useState } from "react";
import api from "@/api/api-connections";
import { errorToast } from "@/utils/toasts";

export default function LoginForm({ setForm }: any) {
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState<Login>({
        email: '',
        password: ''
    })

    function handleChange({ target }: any) {
        setFormData({ ...formData, [target.name]: target.value })
    }

    async function handleSubmit(e: any) {
        e.preventDefault()
        setLoading(true)
        const login = { ...formData }
        try {
            const res = await api.login(login)
            console.log(res.data.token)
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
        <div className="flex relative flex-col bg-slate-100 xl:w-6/12 w-full  py-16 rounded-3xl items-center" data-aos="flip-right">
            <Title textColor="text-gray-500" textSize="text-4xl" textBlack>
                Login
            </Title>
            <form onSubmit={handleSubmit} className="flex flex-col items-center w-full mt-10 font-principal">
                <section className="flex items-center rounded-lg overflow-hidden pl-3 mb-8 bg-white w-4/5">
                    <TfiEmail size={25} color="#FFBF00" />
                    <input className="flex w-full border-none focus:outline-none p-3 text-gray-700"
                        placeholder="email"
                        type="email"
                        onChange={(e: any) => handleChange(e)}
                        name="email"
                        value={formData.email}
                        required
                    />
                </section>
                <section className="flex items-center rounded-lg overflow-hidden pl-3 bg-white w-4/5">
                    <AiFillLock size={25} color="#FFBF00" />
                    <input className="flex w-full border-1 focus:outline-none p-3 text-gray-700"
                        type="password"
                        placeholder="senha"
                        onChange={(e:any) => handleChange(e)}
                        name="password"
                        value={formData.password}
                        required
                    />
                </section>
                <h3 onClick={() => setForm('signup')} className="flex mt-10 text-gray-500 font-black cursor-pointer hover:text-yellow duration-500">
                    Registrar novo usuário
                </h3>
                <FormButtom>
                    Entrar
                </FormButtom>
            </form>
        </div>
    )
}

type Login = {
    email: string;
    password: string;
}