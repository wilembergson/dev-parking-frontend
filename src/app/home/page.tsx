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
import CircleChart from '@/components/circle-chart';
import TypeVehicleChats from '@/components/type-vehicle-charts';
import { useRouter } from 'next/navigation';
import { MdHistory } from "react-icons/md";

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
    const router = useRouter()
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
                if (item.type === 'CAR') {
                    cars++
                }
                else {
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

    async function goToHistoric() {
        setLoading(true)
        router.push('/schedule-historic')
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
                        <div className='flex font-principal text-xl text-gray-clear font-black w-3/5 justify-between mt-6'>
                            <section className='flex justify-between shadow-md p-5 w-2/5 bg-slate-100'>
                                <section>
                                    <div className='flex text-3xl my-2'>
                                        Vagas: {vacanciesNumbers.total}
                                    </div>
                                    <div className='flex text-green-600'>
                                        Livres: {vacanciesNumbers.free}
                                    </div>
                                    <div className='flex text-red-600'>
                                        Ocupadas: {vacanciesNumbers.occupied}
                                    </div>
                                </section>
                                <CircleChart free={vacanciesNumbers.free} occupied={vacanciesNumbers.occupied} />
                            </section>
                            <section className='flex justify-between p-5 shadow-md w-2/5 bg-slate-100'>
                                <section>
                                    <div className='flex text-4xl my-2'>
                                        Tipos
                                    </div>
                                    <div className='flex text-yellow'>
                                        Carros: {vacanciesNumbers.cars}
                                    </div>
                                    <div className='flex text-purple-500'>
                                        Motos: {vacanciesNumbers.motocycles}
                                    </div>
                                </section>
                                <TypeVehicleChats cars={vacanciesNumbers.cars} motocycles={vacanciesNumbers.motocycles} />
                            </section>
                            <button className='flex flex-col items-center justify-center hover:opacity-80 transition duration-300'
                                onClick={() => goToHistoric()}>
                                <MdHistory size={36} />
                                Histórico
                            </button>
                        </div>
                        <section className='flex sm:w-3/5 w-full mb-10'>
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