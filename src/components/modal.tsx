import { ReactNode } from "react"

type Props = {
    isVisible: boolean
    children: ReactNode

}

export default function Modal({ isVisible, children}: Props) {
    if(!isVisible) return null
    return (
        <div className="fixed inset-0 bg-gray-clear-2 bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
            {children}
        </div>
    )
}