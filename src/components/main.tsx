import { ReactNode } from "react"

type Props = {
    children: ReactNode
}

export default function Main({children}: Props){
    return (
        <main className="flex relative min-h-screen w-full h-full flex-col items-center bg-white">
            {children}
        </main>
    )
}