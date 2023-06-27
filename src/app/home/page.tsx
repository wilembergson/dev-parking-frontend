'use client'
import PrivateRoute from "@/components/private-route";
import { useGlobalContext } from "../contexts/user";
import HeaderOption from "@/components/header-option";
import Header from "@/components/Header";

export default function Home() {
    const { userId, userName } = useGlobalContext()
    return (
        <PrivateRoute>
            <Header>
                <h1 className="text-3xl font-black">
                    Parking
                </h1>
                <div className="flex flex-row">
                    <HeaderOption>
                        {userName}
                    </HeaderOption>
                    <HeaderOption>
                        Sair
                    </HeaderOption>
                </div>
            </Header>
            <h1>MAIN CONTENT</h1>
        </PrivateRoute>
    )
}