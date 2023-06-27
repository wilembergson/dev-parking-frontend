'use client'
import api from "@/api/api-connections"
import { ReactNode, useEffect, useState } from "react"
import { useRouter } from "next/navigation";
import { errorToast } from "@/utils/toasts";
import AcessDenied from "./acess-denied";

type Props = {
    children: ReactNode
}

export default function PrivateRoute({ children }: Props) {
    const router = useRouter()
    const [allow, setAllow] = useState(false)

    async function validate() {
        try {
            const token: any = localStorage.getItem("token")
            const tokenData = await api.validateToken(token)
            setAllow(true)
            console.log(tokenData)
            /*if(!tokenData){
                router.push('/')
            }*/
        } catch (error: any) {
            //alert(error.response.data.message)
            localStorage.clear()
            //router.push("/")
        }
    }

    useEffect(() => {
        validate()
    })
    return (
        <main className="flex relative min-h-screen w-full h-full flex-col items-center">
            {(allow) ? children : <AcessDenied />}
        </main>
    )
}