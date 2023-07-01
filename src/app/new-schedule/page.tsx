'use client'
import Header from "@/components/Header";
import LogoutModal from "@/components/logout-modal";
import PrivateRoute from "@/components/private-route";
import { useState } from "react";

export default function NewSchedule() {
    const [showLogout, setShowLogout] = useState(false)
    return (
        <PrivateRoute>
            <>
                <Header showLogout={showLogout} />
            </>
            <LogoutModal isVisible={showLogout} onClick={() => setShowLogout(false)} />
        </PrivateRoute>
    )
}