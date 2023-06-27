'use client'
import PrivateRoute from "@/components/private-route";
import { useGlobalContext } from "../contexts/user";
import HeaderOption from "@/components/header-option";
import Header from "@/components/Header";
import Modal from "@/components/modal";
import { useEffect, useState } from "react";

export default function Home() {
    const { userId, userName } = useGlobalContext()
    const [showLogout, setShowLogout] = useState(false)

    return (
        <PrivateRoute>
            <>
                <Header>
                    <h1 className="text-3xl font-black">
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
            <Modal isVisible={showLogout} close={() => setShowLogout(false)} />
        </PrivateRoute>
    )
}