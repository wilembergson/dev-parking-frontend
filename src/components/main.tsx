import { ReactNode } from "react"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

type Props = {
    children: ReactNode
}

export default function Main({children}: Props){
    return (
        <main className="flex relative min-h-screen w-full h-full flex-col items-center bg-white">
            <ToastContainer />
            {children}
        </main>
    )
}