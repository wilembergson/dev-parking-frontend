import { useRouter } from "next/navigation";
import Modal from "./modal";
import { ImExit } from 'react-icons/im'
import { FaPowerOff } from 'react-icons/fa'
import { useState } from "react";
import Loading from "./loading";

type Props = {
    isVisible: boolean
    onClick?: any
}

export default function UserConfigModal({ isVisible, onClick }: Props) {
    const router = useRouter()
    const [loading, setLoading] = useState<boolean>(false)

    return (
        <Modal isVisible={isVisible}>
            {!loading ?
                <div onClick={() => null} className="flex flex-col shadow-lg justify-center md:m-0 m-5 items-center bg-white rounded-2xl py-12" data-aos="zoom-in">
                    <h1 className="font-principal font-black text-3xl flex-wrap w-3/4 text-center text-gray-clear my-10">
                        Informações do usuário
                    </h1>
                    <section className="flex w-3/4 justify-around">
                        <button className="font-principal text-2xl text-white bg-red-500 px-5 py-2 rounded-lg hover:bg-red-400 transition duration-500"
                            onClick={() => onClick(false)}>
                            Cancelar
                        </button>
                    </section>
                </div> : <Loading />}
        </Modal>
    )
}