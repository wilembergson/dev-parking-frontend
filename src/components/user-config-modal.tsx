import Modal from "./modal";
import { useEffect, useState } from "react";
import Loading from "./loading";
import { useGlobalContext } from "@/app/contexts/user";
import api from "@/api/api-connections";
import { errorToast, infoToast } from "@/utils/toasts";
import { BsCheckAll } from 'react-icons/bs'
import { TfiEmail } from "react-icons/tfi";
import { AiFillLock } from "react-icons/ai";
import { RxUpdate } from 'react-icons/rx'
import { useRouter } from "next/navigation";

type Props = {
    isVisible: boolean
    onClick?: any
}

type UserData = {
    name: string,
    rg: number,
    email: string
}
type Update = {
    email?: string;
    password?: string;
}

export default function UserConfigModal({ isVisible, onClick }: Props) {
    const router = useRouter()
    const { userId, userName } = useGlobalContext()
    const [loading, setLoading] = useState<boolean>(false)
    const [userData, setUserData] = useState<UserData>({
        name: '',
        rg: 0,
        email: ''
    })
    const [updateData, setUpdateData] = useState<Update>({})

    const [isDisabledEmail, setIsDisabledEmail] = useState(false);
    const handleCheckboxChangeEmail = () => {
        setIsDisabledEmail(!isDisabledEmail);
    };

    const [isDisabledPassword, setIsDisabledPassword] = useState(false);
    const handleCheckboxChangePassword = () => {
        setIsDisabledPassword(!isDisabledPassword);
    };

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

    function handleChange({ target }: any) {
        setUpdateData({ ...updateData, [target.name]: target.value })
    }

    function ok() {
        setUpdateData({})
        setIsDisabledEmail(false)
        setIsDisabledPassword(false)
        onClick(false)
    }

    async function updateUser(e:any) {
        e.preventDefault()
        try {
            const token = localStorage.getItem('token')
            await api.updateUser(userId, token!, updateData)
            ok()
            localStorage.clear()
            router.push("/")
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
                <div onClick={() => null} className="flex font-principal  flex-col sm:w-1/2 w-full shadow-lg justify-center overflow-hidden items-center bg-white rounded-2xl" data-aos="zoom-in">
                    <h1 className="font-principal font-black text-3xl flex-wrap w-full p-3 text-center bg-purple-500 text-white">
                        Informações do usuário
                    </h1>
                    <div className="flex sm:flex-row flex-col w-full pt-4 px-4">
                        <section className="flex flex-col w-1/2 p-2 border sm:border-r-2 border-r-0 border-l-0 border-y-0 border-purple-200">
                            <h2 className="text-xl text-gray-clear font-black my-2">
                                <span className="text-purple-500">NOME:</span> {userData.name}
                            </h2>
                            <h2 className="text-xl text-gray-clear font-black my-2">
                                <span className="text-purple-500 ">RG:</span> {userData.rg}
                            </h2>
                            <h2 className="text-xl text-gray-clear font-black my-2">
                                <span className="text-purple-500">EMAIL:</span> {userData.email}
                            </h2>
                        </section>
                        <form className="flex flex-col items-center sm:w-1/2 w-full sm:mt-0 mt-10 font-principal pb-4"
                            onSubmit={updateUser}>
                            <h2 className="text-xl text-gray-clear font-black mb-10">
                                Atualizar dados
                            </h2>
                            <section className="flex items-center rounded-lg overflow-hidden pl-3 mb-8 bg-white w-4/5">
                                <input
                                    type="checkbox"
                                    className="form-checkbox h-5 w-5 bg-purple-500 mr-2 cursor-pointer transition duration-150 ease-in-out"
                                    checked={isDisabledEmail}
                                    onChange={handleCheckboxChangeEmail}
                                />
                                <TfiEmail size={25} color={isDisabledEmail ? "#FFBF00" : "#848484"} />
                                <input
                                    className={`flex w-full border-none ml-2 rounded-lg focus:outline-none p-3 text-gray bg-blue-50
                                    ${!isDisabledEmail ? 'pointer-events-none opacity-50' : ''}`}
                                    placeholder="email"
                                    type="email"
                                    onChange={(e: any) => handleChange(e)}
                                    name="email"
                                    value={updateData!.email!}
                                />
                            </section>
                            <section className="flex items-center rounded-lg overflow-hidden pl-3 bg-white w-4/5">
                                <input
                                    type="checkbox"
                                    className="form-checkbox h-5 w-5 bg-purple-500 mr-2 cursor-pointer transition duration-150 ease-in-out"
                                    checked={isDisabledPassword}
                                    onChange={handleCheckboxChangePassword}
                                />
                                <AiFillLock size={25} color={isDisabledPassword ? "#FFBF00" : "#848484"} />
                                <input
                                    className={`flex w-full border-1 ml-2 rounded-lg focus:outline-none p-3 text-gray bg-blue-50
                                    ${!isDisabledPassword ? 'pointer-events-none opacity-50' : ''}`}
                                    type="password"
                                    placeholder="senha"
                                    onChange={(e: any) => handleChange(e)}
                                    name="password"
                                    value={updateData!.password}
                                />
                            </section>
                            <button
                                className={`flex items-center font-principal bg-yellow hover:bg-yellow2 duration-500 text-white text-2xl px-4 py-2 rounded-xl mt-10
                                ${!isDisabledEmail && !isDisabledPassword ? 'pointer-events-none opacity-50' : ''}`}
                            >
                                <RxUpdate /> Atualizar
                            </button>
                        </form>
                    </div>
                    <section className="flex w-3/4 justify-around">
                        <button className="flex items-center font-principal text-2xl my-6 text-white  bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-400 transition duration-500"
                            onClick={() => ok()}>
                            <BsCheckAll size={32} />OK
                        </button>
                    </section>
                </div> : <Loading />}
        </Modal>
    )
}