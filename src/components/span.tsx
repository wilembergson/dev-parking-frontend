import { ReactNode } from "react"

type Props = {
    children: ReactNode
}

export default function Span({ children }: Props) {
    return (
        <span className="text-purple-500">{children}</span>
    )
}