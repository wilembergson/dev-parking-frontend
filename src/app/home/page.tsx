'use client'
import Aos from 'aos'
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from "@/components/private-route";
import { useGlobalContext } from "../contexts/user";
import Header from "@/components/Header";
import { useEffect, useState } from "react";
import LogoutModal from "@/components/logout-modal";
import { IoIosSettings } from 'react-icons/io'
import UserConfigModal from '@/components/user-config-modal';
import api from '@/api/api-connections';
import { errorToast } from '@/utils/toasts';
import Vacancy from '@/components/vacancy';
import Main from '@/components/main';
import Loading from '@/components/loading';

type Vacancie = {
    id: string,
    localization: string,
    occupied: string
    type: string
}

type VacanciesNumbers = {
    total: number,
    free: number,
    occupied: number,
    cars: number,
    motocycles: number
}

export default function Home() {
    const { userName } = useGlobalContext()
    const [loading, setLoading] = useState(false)
    const [showLogout, setShowLogout] = useState(false)
    const [showUserConfig, setShowUserConfig] = useState(false)
    const [vacancies, setVacancies] = useState<Vacancie[]>([])
    const [vacanciesNumbers, setVacanciesNumbers] = useState<VacanciesNumbers>({
        total: 0,
        free: 0,
        occupied: 0,
        cars: 0,
        motocycles: 0
    })

    function vacanciesNumbersData(list: Vacancie[]) {
        let free = 0
        let occupied = 0
        let cars = 0
        let motocycles = 0
        list.forEach(item => {
            if (item.occupied) {
                if(item.type === 'CAR'){
                    cars++
                }
                else{
                    motocycles++
                }
                occupied++
            } else {
                free++
            }
        })
        setVacanciesNumbers({
            total: list.length,
            free,
            occupied,
            cars,
            motocycles
        })
    }

    async function getVacancies() {
        try {
            const res = await api.listVacancies()
            setVacancies(res.data)
            vacanciesNumbersData(res.data)
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
        Aos.init({ duration: 500 })
        getVacancies()
    }, [])

    return (
        <PrivateRoute>
            <>
                <Header showLogout={setShowLogout} />
                {!loading ?
                    <Main>
                        <section className='flex justify-end items-center sm:w-3/5 w-full pt-4 pb-2 sm:px-0 px-2 border border-b-2 border-t-0 border-x-0 border-gray-clear'>
                            <h1 className='text-xl text-gray-clear font-black mr-4'>
                                Olá, {userName}
                            </h1>
                            <div className='flex cursor-pointer text-gray-clear hover:text-yellow transition duration-500'
                                onClick={() => setShowUserConfig(true)}>
                                <IoIosSettings size={32} />
                            </div>
                        </section>
                        <div className='flex w-3/5 justify-between mt-6'>
                            <section className='flex flex-col shadow-md p-5 w-3/5'>
                                <div>Total: {vacanciesNumbers.total}</div>
                                <div>Livres: {vacanciesNumbers.free}</div>
                                <div>Ocupadas: {vacanciesNumbers.occupied}</div>
                            </section>
                            <section className='flex flex-col justify-center p-5 shadow-md w-1/5'>
                                <div>Carros: {vacanciesNumbers.cars}</div>
                                <div>Motos: {vacanciesNumbers.motocycles}</div>
                            </section>
                        </div>
                        <section className='flex sm:w-3/5 w-full'>
                            <div className="flex flex-wrap justify-between sm:w-3/5 w-full mt-6 shadow-md rounded-lg">
                                {vacancies.map((item) => {
                                    if (item.type === 'CAR')
                                        return <Vacancy key={item.id} vacancy={item} setLoading={setLoading} />
                                })}
                            </div>
                            <div className="flex flex-wrap justify-end sm:w-2/5 w-full mt-6 shadow-md rounded-lg">
                                {vacancies.map((item) => {
                                    if (item.type === 'MOTOCYCLE')
                                        return <Vacancy key={item.id} vacancy={item} setLoading={setLoading} />
                                })}
                            </div>
                        </section>
                    </Main> : <Loading />}
            </>
            <LogoutModal isVisible={showLogout} onClick={() => setShowLogout(false)} />
            <UserConfigModal isVisible={showUserConfig} onClick={() => setShowUserConfig(false)} />
        </PrivateRoute>
    )
}