import { ReactNode } from "react"
import { FaCar, FaPowerOff } from "react-icons/fa"
import HeaderOption from "./header-option"
import { useRouter } from "next/navigation"

type Props = {
    showLogout: any
}

export default function Header({ showLogout }: Props) {
    const router = useRouter()
    return (
        <header className="flex relative flex-row items-center bg-purple-500 w-full sm:justify-around justify-between sm:pl-0 pl-4 font-principal text-white">
            <section className='flex justify-between md:w-3/5 w-full'>
                <h1 onClick={() => router.push('/home')} className="flex justify-center items-center cursor-pointer text-3xl font-black text-yellow">
                    <FaCar />
                    Parking
                </h1>
                <div className="flex flex-row">
                    <HeaderOption onClick={() => showLogout(true)}>
                        <section className='flex justify-between items-center'>
                            <FaPowerOff />
                            <h1 className='flex ml-2'>sair</h1>
                        </section>
                    </HeaderOption>
                </div>
            </section>
        </header>
    )
}