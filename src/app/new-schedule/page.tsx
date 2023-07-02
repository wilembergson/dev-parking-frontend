'use client'
import Header from "@/components/Header";
import LogoutModal from "@/components/logout-modal";
import Main from "@/components/main";
import PrivateRoute from "@/components/private-route";
import { useEffect, useState } from "react";
import { useGlobalContext } from "../contexts/user";
import { useRouter } from "next/navigation";

export default function NewSchedule() {
    const router = useRouter()
    const { userName, vacancy } = useGlobalContext()
    const [showLogout, setShowLogout] = useState(false)

    useEffect(() => {
        if (!vacancy)
            router.push('/home')
    })

    return (
        <PrivateRoute>
            <>
                <Header showLogout={setShowLogout} />
                <Main>
                    <section className='flex justify-center items-center sm:w-3/5 w-full pt-4 pb-2 sm:px-0 px-2 border border-b-0 border-t-0 border-x-0 border-gray-clear'>
                        <h1 className='text-5xl text-gray-clear font-black mr-4 mt-4'>
                            Nova reserva
                        </h1>
                    </section>
                    <section className='flex justify-start items-center sm:w-3/5 w-full pt-4 pb-2 sm:px-0 px-2 mt-6 border border-b-1 border-t-0 border-x-0 border-gray-clear'>
                        <h1 className='text-2xl text-yellow font-black mr-4'>
                            Dados da vaga
                        </h1>
                    </section>
                    <section className='flex flex-col justify-start items-start sm:w-3/5 w-full pt-4 pb-2 sm:px-0 px-2 mt-2'>
                        <h1 className='text-xl text-gray-clear font-black mr-4'>
                        <span className="text-purple-500">Localização:</span> {vacancy?.localization}
                        </h1>
                        <h1 className='text-xl text-gray-clear font-black mr-4'>
                        <span className="text-purple-500">Veículo:</span> {vacancy?.type === 'CAR' ? 'Carro' : 'Moto'}
                        </h1>
                        <h1 className='text-xl text-gray-clear font-black mr-4'>
                        <span className="text-purple-500">Status:</span> {vacancy?.occupied ? 'Ocupada' : 'Disponível'}
                        </h1>
                    </section>
                </Main>
            </>
            <LogoutModal isVisible={showLogout} onClick={() => setShowLogout(false)} />
        </PrivateRoute>
    )
}