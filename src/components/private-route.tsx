'use client'
import { ReactNode, useEffect, useState } from "react"
import { useRouter } from "next/navigation";
import { useGlobalContext } from "@/app/contexts/user"
import api from "@/api/api-connections"
import Loading from "./loading"

type Props = {
    children: ReactNode
}

export default function PrivateRoute({ children }: Props) {
    const { setUserId, setUserName } = useGlobalContext()
    const router = useRouter()
    const [loading, setLoading] = useState(true)

    async function validate() {
        try {
            const token: any = localStorage.getItem("token")
            const tokenRes = await api.validateToken(token)
            setUserId(tokenRes.data.id)
            setUserName(tokenRes.data.name)
            setLoading(false)
        } catch (error: any) {
            localStorage.clear()
            router.push("/")
        }
    }

    useEffect(() => {
        validate()
    })
    return (
        <main className="flex relative min-h-screen w-full h-full flex-col items-center">
            {
                (loading) ?
                    <div className="flex w-full min-h-screen justify-center items-center">
                        <Loading />
                    </div>
                    : children
            }
        </main>
    )
}