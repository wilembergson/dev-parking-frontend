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
import HistoricItem, { informations } from "@/components/historic-item";

export default function ScheduleHistoric() {
    const router = useRouter()
    const [showLogout, setShowLogout] = useState(false)
    const [schedules, setSchedules] = useState<informations[]>()
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

    async function listSchedules() {
        try {
            const token: any = localStorage.getItem('token')
            const res = await api.scheduleHistoric(token)
            setSchedules(res.data)
            //formatCheckIn(res.data.checkIn)
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
        listSchedules()
    }, [])

    return (
        <PrivateRoute>
            <>
                <Header showLogout={setShowLogout} />
                <Main>
                    <PageTitle>Histórico de reservas</PageTitle>
                    {schedules?.length !== 0?
                        <div className="flex flex-col m-8">
                            {schedules?.map(item => <HistoricItem info={item} />)}
                        </div>
                        : <h1 className="flex font-principal text-gray-clear-2 font-black my-20 text-2xl">
                            [ Histórico vazío ]
                        </h1>
                    }
                    <BackButton />
                </Main>
            </>
            {/* <FinishScheduleModal isVisible={showModal} scheduleId={schedule?.id!} onClick={() => setShowModal(false)} />*/}
        </PrivateRoute>
    )
}