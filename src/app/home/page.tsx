'use client'
import Aos from 'aos'
import PrivateRoute from "@/components/private-route";
import { useGlobalContext } from "../contexts/user";
import HeaderOption from "@/components/header-option";
import Header from "@/components/Header";
import { useEffect, useState } from "react";
import LogoutModal from "@/components/logout-modal";
import { FaCar } from 'react-icons/fa';

export default function Home() {
    const { userId, userName } = useGlobalContext()
    const [showLogout, setShowLogout] = useState(false)

    useEffect(() => {
        Aos.init({ duration: 500 })
    }, [])

    return (
        <PrivateRoute>
            <>
                <Header>
                    <h1 className="flex justify-center items-center cursor-default text-3xl font-black text-yellow">
                        <FaCar />
                        Parking
                    </h1>
                    <div className="flex flex-row">
                        <HeaderOption>
                            {userName}
                        </HeaderOption>
                        <HeaderOption onClick={() => setShowLogout(true)}>
                            <h1 >
                                Sair
                            </h1>
                        </HeaderOption>
                    </div>
                </Header>
                <h1>MAIN CONTENT</h1>
            </>
            <LogoutModal isVisible={showLogout} onClick={() => setShowLogout(false)} />
        </PrivateRoute>
    )
}