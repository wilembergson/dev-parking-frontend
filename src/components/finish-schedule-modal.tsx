import Modal from "./modal";
import { useState } from "react";
import Loading from "./loading";
import api from "@/api/api-connections";
import { errorToast } from "@/utils/toasts";
import { BsCheckAll } from 'react-icons/bs'
import { GiCancel } from "react-icons/gi";
import { useRouter } from "next/navigation";
import { FaCalendarCheck, FaPowerOff } from "react-icons/fa";

type Props = {
    scheduleId: string | undefined,
    isVisible: boolean
    onClick?: any
}

export default function FinishScheduleModal({ scheduleId, isVisible, onClick }: Props) {
    const [loading, setLoading] = useState<boolean>(false)
    const [customerName, setCustomerName] = useState('')
    const router = useRouter()

    function cancel() {
        setCustomerName('')
        onClick(false)
    }

    async function finishSchedule() {
        setLoading(true)
        try {
            const token: any = localStorage.getItem('token')
            await api.finishSchedule(scheduleId!, token)
            router.push('/home')
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
        <Modal isVisible={isVisible}>
            {!loading ?
                <div onClick={() => null} className="flex bg-white font-principal  flex-col md:w-1/4 w-full shadow-lg justify-center overflow-hidden items-center rounded-2xl" data-aos="zoom-in">
                    <div className="flex flex-col items-center w-full pt-14 px-4">
                        <FaCalendarCheck size={82} color="#FFBF00" />
                        <h1 className="font-principal font-black text-3xl flex-wrap w-3/4 text-center text-gray-clear my-10">
                            Tem certeza que deseja finalizar esta reserva?
                        </h1>
                        <section className="flex justify-around w-full">
                            <button className="flex items-center font-principal text-2xl my-6 text-white  bg-green-500 px-4 py-2 rounded-lg hover:opacity-80 transition duration-500"
                                onClick={() => finishSchedule()}>
                                <BsCheckAll size={32} />Finalizar
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