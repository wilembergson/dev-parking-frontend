'use client'
import Aos from 'aos'
import PrivateRoute from "@/components/private-route";
import { useGlobalContext } from "../contexts/user";
import HeaderOption from "@/components/header-option";
import Header from "@/components/Header";
import { useEffect, useState } from "react";
import LogoutModal from "@/components/logout-modal";
import { FaCar, FaPowerOff } from 'react-icons/fa';
import { IoIosSettings } from 'react-icons/io'

export default function Home() {
    const { userId, userName } = useGlobalContext()
    const [showLogout, setShowLogout] = useState(false)

    useEffect(() => {
        Aos.init({ duration: 1000 })
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
                                    <FaPowerOff/>
                                    <h1 className='flex ml-2'>sair</h1>
                                </section>
                            </HeaderOption>
                        </div>
                    </section>
                </Header>
                <main className="flex relative min-h-screen w-full h-full flex-col items-center bg-white">
                    <section className='flex justify-end items-center sm:w-3/5 w-full pt-4 pb-2 sm:px-0 px-2 border border-b-2 border-t-0 border-x-0 border-gray-500'>
                        <h1 className='text-xl text-gray-700 font-black mr-4'>
                            Olá, {userName}
                        </h1>
                        <div className='flex cursor-pointer text-gray-700 hover:text-yellow transition duration-500'>
                            <IoIosSettings size={32} />
                        </div>
                    </section>
                </main>
            </>
            <LogoutModal isVisible={showLogout} onClick={() => setShowLogout(false)} />
        </PrivateRoute>
    )
}