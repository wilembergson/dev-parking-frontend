import { ReactNode } from "react"

type Props = {
    children: ReactNode
}

export default function Header({ children }: Props) {
    return (
        <header className="flex relative flex-row items-center bg-purple-500 w-full sm:justify-around justify-between pl-4 font-principal text-white">
            {children}
        </header>
    )
}