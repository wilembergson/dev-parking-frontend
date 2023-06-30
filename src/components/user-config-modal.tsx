import Modal from "./modal";
import { useEffect, useState } from "react";
import Loading from "./loading";
import { useGlobalContext } from "@/app/contexts/user";
import api from "@/api/api-connections";
import { errorToast } from "@/utils/toasts";
import { BsCheckAll } from 'react-icons/bs'

type Props = {
    isVisible: boolean
    onClick?: any
}

type UserData = {
    name: string,
    rg: number,
    email: string
}

export default function UserConfigModal({ isVisible, onClick }: Props) {
    const { userId, userName } = useGlobalContext()
    const [loading, setLoading] = useState<boolean>(false)
    const [userData, setUserData] = useState<UserData>({
        name: '',
        rg: 0,
        email: ''
    })

    async function loadUserData() {
        try {
            const token = localStorage.getItem('token')
            const res = await api.getUserInfo(userId, token!)
            setUserData({
                name: res.data.name,
                rg: res.data.rg,
                email: res.data.email
            })
        } catch (error: any) {
            const errorMessage = (
                (error.response.data.message.message)
                    ? error.response.data.message.message[0]
                    : error.response.data.message
            )
            errorToast(errorMessage)
        }
    }

    useEffect(() => {
        loadUserData()
    })

    return (
        <Modal isVisible={isVisible}>
            {!loading ?
                <div onClick={() => null} className="flex flex-col w-1/2 shadow-lg justify-center overflow-hidden items-center bg-white rounded-2xl" data-aos="zoom-in">
                    <h1 className="font-principal font-black text-3xl flex-wrap w-full p-3 text-center bg-purple-500 text-white">
                        Informações do usuário
                    </h1>
                    <section className="flex flex-col p-2">
                        <h2 className="text-xl text-gray-clear font-black my-2">
                            NOME: {userData.name}
                        </h2>
                        <h2 className="text-xl text-gray-clear font-black my-2">
                            RG: {userData.rg}
                        </h2>
                        <h2 className="text-xl text-gray-clear font-black my-2">
                            EMAIL: {userData.email}
                        </h2>
                    </section>
                    <section className="flex w-3/4 justify-around">
                        <button className="flex items-center font-principal text-2xl my-6 text-white  bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-400 transition duration-500"
                            onClick={() => onClick(false)}>
                                <BsCheckAll size={32}/>OK
                        </button>
                    </section>
                </div> : <Loading />}
        </Modal>
    )
}