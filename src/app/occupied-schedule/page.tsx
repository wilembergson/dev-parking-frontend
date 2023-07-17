'use client'
import Header from "@/components/Header";
import Main from "@/components/main";
import PageTitle from "@/components/page-title";
import PrivateRoute from "@/components/private-route";
import { useState } from "react";

export default function OccupiedSchedule() {
    const [showLogout, setShowLogout] = useState(false)

    return (
        <PrivateRoute>
            <>
                <Header showLogout={setShowLogout} />
                <Main>
                    <PageTitle>Dados da reserva</PageTitle>
                </Main>
            </>
        </PrivateRoute>
    )
}