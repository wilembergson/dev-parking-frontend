'use client'
import PrivateRoute from "@/components/private-route";
import { useGlobalContext } from "../contexts/user";

export default function Home() {
    const { userId, userName } = useGlobalContext()
    return (
        <PrivateRoute>
            <h1>ID: {userId}</h1>
            <h1>NAME: {userName}</h1>
        </PrivateRoute>
    )
}