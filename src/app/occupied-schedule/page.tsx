'use client'
import api from "@/api/api-connections";
import Header from "@/components/Header";
import Main from "@/components/main";
import PageTitle from "@/components/page-title";
import PrivateRoute from "@/components/private-route";
import { errorToast } from "@/utils/toasts";
import { useEffect, useState } from "react";
import { useGlobalContext } from "../contexts/user";

export default function OccupiedSchedule() {
    const { vacancy } = useGlobalContext()
    const [showLogout, setShowLogout] = useState(false)
    const [schedule, setSchedule] = useState<any>()

    async function getSchedule() {
        try {
            const token: any = localStorage.getItem('token')
            const res = await api.getScheduleByVacancy(vacancy?.id!, token)
            console.log(res.data)
            setSchedule(res.data)
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
                    <h1>Entrada: {schedule?.checkIn}</h1>
                    <h1>Preço por hora: R${schedule?.pricePerHour}</h1>
                    <h1>Total: R${schedule?.priceTotal}</h1>
                    <h1>Cliente: {schedule?.customer.name}</h1>
                    <h1>Placa: {schedule?.vehiclePlate}</h1>
                    <h1>Vaga: {schedule?.vacancy.localization}</h1>
                    <h1>Atendido(a) por: {schedule?.employeeUser.name}</h1>
                </Main>
            </>
        </PrivateRoute>
    )
}