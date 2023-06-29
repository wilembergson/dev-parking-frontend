import { useRouter } from "next/navigation"
import { GiStopSign } from 'react-icons/gi'

export default function AcessDenied() {
    const router = useRouter()

    return (
        <div className="flex flex-col w-full h-screen p-50 justify-center items-center bg-gray">
            <GiStopSign size={200} color='red' />
            <h1 className="font-principal font-black text-6xl text-gray m-20">
                Acesso negado
            </h1>
            <button className="font-principal bg-yellow text-white text-2xl px-6 py-3 rounded-lg"
                onClick={() => router.push('/')}>
                Faça login
            </button>
        </div>
    )
}