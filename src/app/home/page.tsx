'use client'
import Aos from 'aos'
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from "@/components/private-route";
import { useGlobalContext } from "../contexts/user";
import HeaderOption from "@/components/header-option";
import Header from "@/components/Header";
import { useEffect, useState } from "react";
import LogoutModal from "@/components/logout-modal";
import { FaCar, FaPowerOff } from 'react-icons/fa';
import { IoIosSettings } from 'react-icons/io'
import UserConfigModal from '@/components/user-config-modal';
import api from '@/api/api-connections';
import { errorToast } from '@/utils/toasts';
import Vacancy from '@/components/vacancy';

type Vacancie = {
    id: string,
    localization: string,
    occupied: string
    type: string
}

export default function Home() {
    const { userId, userName } = useGlobalContext()
    const [showLogout, setShowLogout] = useState(false)
    const [showUserConfig, setShowUserConfig] = useState(false)
    const [vacancies, setVacancies] = useState<Vacancie[]>([])

    async function getVacancies() {
        try {
            const res = await api.listVacancies()
            setVacancies(res.data)
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
    })

    return (
        <PrivateRoute>
            <>
                <Header>
                    <section className='flex justify-between md:w-3/5 w-full'>
                        <h1 className="flex justify-center items-center cursor-default text-3xl font-black text-yellow">
                            <FaCar />
                            Parking
                        </h1>
                        <div className="flex flex-row">
                            <HeaderOption onClick={() => setShowLogout(true)}>
                                <section className='flex justify-between items-center'>
                                    <FaPowerOff />
                                    <h1 className='flex ml-2'>sair</h1>
                                </section>
                            </HeaderOption>
                        </div>
                    </section>
                </Header>
                <main className="flex relative min-h-screen w-full h-full flex-col items-center bg-white">
                    <section className='flex justify-end items-center sm:w-3/5 w-full pt-4 pb-2 sm:px-0 px-2 border border-b-2 border-t-0 border-x-0 border-gray-clear'>
                        <h1 className='text-xl text-gray-clear font-black mr-4'>
                            Olá, {userName}
                        </h1>
                        <div className='flex cursor-pointer text-gray-clear hover:text-yellow transition duration-500'
                            onClick={() => setShowUserConfig(true)}>
                            <IoIosSettings size={32} />
                        </div>
                    </section>
                    <section className='flex sm:w-3/5 w-full'>
                        <div className="flex flex-wrap justify-between sm:w-3/5 w-full mt-6">
                            {vacancies.map((item) => {
                                if (item.type === 'CAR')
                                    return <Vacancy key={item.id} vacancy={item} />
                            })}
                        </div>
                        <div className="flex flex-wrap justify-end sm:w-2/5 w-full mt-6">
                            {vacancies.map((item) => {
                                if (item.type === 'MOTOCYCLE')
                                    return <Vacancy key={item.id} vacancy={item} />
                            })}
                        </div>
                    </section>
                </main>
            </>
            <LogoutModal isVisible={showLogout} onClick={() => setShowLogout(false)} />
            <UserConfigModal isVisible={showUserConfig} onClick={() => setShowUserConfig(false)} />
        </PrivateRoute>
    )
}