'use client'
import api from "@/api/api-connections";
import Header from "@/components/Header";
import Main from "@/components/main";
import PageTitle from "@/components/page-title";
import PrivateRoute from "@/components/private-route";
import { errorToast } from "@/utils/toasts";
import { useEffect, useState } from "react";
import DataDescription from "@/components/data-description";
import { useGlobalContext } from "../contexts/user";
import { useRouter } from "next/navigation";
import Span from "@/components/span";
import BackButton from "@/components/back-button";
import FinishScheduleModal from "@/components/finish-schedule-modal";

export default function OccupiedSchedule() {
    const router = useRouter()
    const { vacancy } = useGlobalContext()
    const [showLogout, setShowLogout] = useState(false)
    const [schedule, setSchedule] = useState<any>()
    const [checkIn, setCheckIn] = useState('')
    const [showModal, setShowModal] = useState(false)

    async function formatCheckIn(date: string) {
        const checkIn = new Date(date)
        const day = (checkIn.getDate() < 10) ? `0${checkIn.getDate()}` : `${checkIn.getDate()}`
        const month = (checkIn.getMonth() + 1 < 10) ? `0${checkIn.getMonth() + 1}` : `${checkIn.getMonth() + 1}`
        const hour = (checkIn.getHours() < 10) ? `0${checkIn.getHours()}` : `${checkIn.getHours()}`
        const minutes = checkIn.getUTCMinutes()
        setCheckIn(`${day}/${month}/${checkIn.getFullYear()} às ${hour}:${minutes}`)
    }

    async function getSchedule() {
        try {
            const token: any = localStorage.getItem('token')
            const res = await api.getScheduleByVacancy(vacancy?.id!, token)
            setSchedule(res.data)
            formatCheckIn(res.data.checkIn)
        } catch (error: any) {
            const errorMessage = (
                (error.response.data.message.message)
                    ? error.response.data.message.message[0]
                    : error.response.data.message
            )
            errorToast(errorMessage)
        }
    }

    async function finishSchedule() {
        try {
            const token: any = localStorage.getItem('token')
            await api.finishSchedule(schedule?.id!, token)
            router.push('/home')
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
        const rest = async () => {
            if (!vacancy) {
                router.push('/home')
            }
            await getSchedule()
        }
        rest()
    }, [])

    return (
        <PrivateRoute>
            <>
                <Header showLogout={setShowLogout} />
                <Main>
                    <PageTitle>Dados da reserva</PageTitle>
                    <div className="flex m-8">
                        <section className="flex flex-col shadow-md m-4 p-4">
                            <DataDescription>
                                <Span>Entrada:</Span> {checkIn}
                            </DataDescription>
                            <DataDescription>
                                <Span>Preço por hora:</Span> R${parseFloat(schedule?.pricePerHour).toFixed(2)}
                            </DataDescription>
                            <h1 className='text-3xl text-gray-clear font-black mt-4'>
                                <span className="text-yellow">Valor total:</span> R${schedule?.priceTotal}
                            </h1>
                        </section>
                        <section className="flex flex-col shadow-md m-4 p-4">
                            <DataDescription>
                                <Span>Cliente:</Span> {schedule?.customer.name}
                            </DataDescription>
                            <DataDescription>
                                <Span>Placa:</Span> {schedule?.vehiclePlate}
                            </DataDescription>
                            <DataDescription>
                                <Span>Vaga:</Span> {schedule?.vacancy.localization}
                            </DataDescription>
                            <DataDescription>
                                <Span>Atendido(a) por:</Span> {schedule?.employeeUser.name}
                            </DataDescription>
                        </section>
                    </div>
                    <BackButton />
                    <button className="flex bg-yellow hover:bg-yellow2 duration-500 text-white text-4xl px-5 py-3 rounded-xl mt-16"
                        onClick={() => setShowModal(true)}>
                        Finalizar
                    </button>
                </Main>
            </>
            <FinishScheduleModal isVisible={showModal} scheduleId={schedule?.id!} onClick={() => setShowModal(false)}/>
        </PrivateRoute>
    )
}