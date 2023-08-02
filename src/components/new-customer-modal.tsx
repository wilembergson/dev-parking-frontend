import Modal from "./modal";
import Loading from "./loading";
import { useState } from "react";
import api from "@/api/api-connections";
import { GiCancel } from "react-icons/gi";
import { BsCheckAll } from 'react-icons/bs'
import { errorToast } from "@/utils/toasts";

type Props = {
    isVisible: boolean
    rg: number
    onClick?: any
}

type UserData = {
    name: string,
    rg: number | undefined
}

export default function NewCustomerModal({ isVisible, rg, onClick }: Props) {
    const [loading, setLoading] = useState<boolean>(false)
    const [customerName, setCustomerName] = useState('')

    function cancel() {
        setCustomerName('')
        onClick(false)
    }

    async function save() {
        try {
            const token: any = localStorage.getItem('token')
            await api.saveCustomer({
                name: customerName,
                rg: rg.toString()
            }, token)
            setCustomerName('')
            onClick(false)
        } catch (error: any) {
            const errorMessage = (
                (error.response.data.message.message)
                    ? error.response.data.message.message[0]
                    : error.response.data.message
            )
            errorToast(errorMessage)
        }
    }

    return (
        <Modal isVisible={isVisible}>
            {!loading ?
                <div onClick={() => null} className="flex bg-white font-principal  flex-col md:w-1/4 w-full shadow-lg justify-center overflow-hidden items-center rounded-2xl" data-aos="zoom-in">
                    <h1 className="font-principal font-black text-3xl flex-wrap w-full p-3 text-center bg-purple-500 text-white">
                        Cadastrar cliente
                    </h1>
                    <div className="flex flex-col justify-center w-full pt-4 px-4">
                        <form className="flex flex-col items-center w-full sm:mt-0 mt-10 font-principal pb-4">
                            <section className="flex items-center rounded-lg overflow-hidden pl-3 bg-white w-4/5 mb-4">
                                <h1 className="flex font-principal font-black text-purple-500">RG</h1>
                                <input
                                    className={`flex w-full border-1 ml-2 rounded-lg focus:outline-none p-3 text-gray bg-blue-50`}
                                    type="number"
                                    placeholder="RG"
                                    name="rg"
                                    value={rg}
                                    disabled
                                />
                            </section>
                            <section className="flex items-center rounded-lg overflow-hidden pl-3 bg-white w-4/5">
                            <h1 className="flex font-principal font-black text-purple-500">NOME</h1>
                                <input
                                    className={`flex w-full border-none ml-2 rounded-lg focus:outline-none p-3 text-gray bg-blue-50`}
                                    placeholder="nome"
                                    type="text"
                                    onChange={(e: any) => setCustomerName(e.target.value)}
                                    name="name"
                                    value={customerName}
                                    required
                                />
                            </section>
                        </form>
                        <section className="flex justify-around w-full">
                            <button className="flex items-center font-principal text-2xl my-6 text-white  bg-green-500 px-4 py-2 rounded-lg hover:opacity-80 transition duration-500"
                                onClick={() => save()}>
                                <BsCheckAll size={32} />Salvar
                            </button>
                            <button className="flex items-center font-principal text-2xl my-6 text-white  bg-red-500 px-4 py-2 rounded-lg hover:opacity-80 transition duration-500"
                                onClick={() => cancel()}>
                                <GiCancel size={24} />Cancelar
                            </button>
                        </section>
                    </div>
                </div> : <Loading />}
        </Modal>
    )
}