import { ReactNode } from "react"

type Props = {
    children: ReactNode
    onClick?: any
}

export default function HeaderOption({ children, onClick }: Props) {
    return (
        <section onClick={() => onClick()} className="flex h-max text-xl p-8 cursor-pointer hover:bg-purple-800 transition duration-400">
            {children}
        </section>
    )
}