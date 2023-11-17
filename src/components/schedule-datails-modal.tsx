import Modal from "./modal";
import { ReactNode, useEffect, useState } from "react";
import Loading from "./loading";
import api from "@/api/api-connections";
import { errorToast } from "@/utils/toasts";
import { BsCheckAll } from 'react-icons/bs'
import { GiCancel } from "react-icons/gi";
import { useRouter } from "next/navigation";
import { FaCalendarCheck, FaPowerOff } from "react-icons/fa";
import { Informations } from "./historic-item";
import formatedDate from "@/utils/formated-date";

type Props = {
    schedule: Informations | undefined,
    isVisible: boolean
    onClick?: any
}

export default function ScheduleDatailsModal({ schedule, isVisible, onClick }: Props) {
    const [loading, setLoading] = useState<boolean>(false)
    const router = useRouter()
    const [checkIn, setCheckIn] = useState<string>('')
    const [checkOut, setCheckOut] = useState<string>('')

    useEffect(() => {
        const formatedCheckIn = formatedDate(schedule?.checkIn!)
        const formatedCheckOut = formatedDate(schedule?.checkOut!)
        setCheckIn(formatedCheckIn)
        setCheckOut(formatedCheckOut)
    }, [schedule])

    function cancel() {
        onClick(false)
    }

    return (
        <Modal isVisible={isVisible}>
            {!loading ?
                <div onClick={() => null} className="flex font-principal  flex-col sm:w-1/2 w-full shadow-lg justify-center overflow-hidden items-center bg-white rounded-2xl" data-aos="zoom-in">
                    <div className="flex flex-col items-center w-full">
                        <h1 className="font-principal font-black text-3xl flex-wrap w-full p-3 text-center bg-purple-500 text-white">
                            Detalhes da reserva
                        </h1>
                        <section className="flex flex-wrap justify-around w-full p-2">
                            <Info title="Cliente">{schedule?.customer.name}</Info>
                            <Info title="RG">{schedule?.customer.rg}</Info>
                            <Info title="Placa">{schedule?.vehiclePlate}</Info>
                            <Info title="Vaga">{schedule?.vacancy.localization}</Info>
                            <Info title="Tipo">
                                {schedule?.vacancy.type}
                            </Info>
                        </section>
                        <section className="flex flex-wrap justify-around w-full p-2">
                            <Info title="Checkin">{checkIn}</Info>
                            <Info title="Checkout">{checkOut}</Info>
                            <Info title="Valor por hora">R${schedule?.pricePerHour}</Info>
                            <Info title="Valor total">R${schedule?.priceTotal}</Info>
                        </section>
                    </div>
                    <button className="flex items-center font-principal text-2xl my-6 text-white  bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-400 transition duration-500"
                        onClick={() => cancel()}>
                        <BsCheckAll size={32} />OK
                    </button>
                </div> : <Loading />}
        </Modal>
    )
}

type InfoProps = {
    title: string,
    children: ReactNode
}
function Info({ title, children }: InfoProps) {
    return (
        <h1 className="flex flex-col m-4">
            <strong>{title}</strong>{children}
        </h1>
    )
}