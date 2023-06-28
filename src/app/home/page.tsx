'use client'
import Aos from 'aos'
import PrivateRoute from "@/components/private-route";
import { useGlobalContext } from "../contexts/user";
import HeaderOption from "@/components/header-option";
import Header from "@/components/Header";
import { useEffect, useState } from "react";
import LogoutModal from "@/components/logout-modal";

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
                    <h1 className="text-3xl font-black text-yellow">
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