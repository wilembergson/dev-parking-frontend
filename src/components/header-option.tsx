import { ReactNode } from "react"

type Props = {
    children: ReactNode
    onClick?: any
}

export default function HeaderOption({ children, onClick }: Props) {
    return (
        <section onClick={() => onClick()} className="flex h-max text-xl p-8 cursor-pointer hover:bg-purple-800 hover:text-yellow2 transition duration-500">
            {children}
        </section>
    )
}