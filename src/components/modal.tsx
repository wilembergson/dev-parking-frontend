import { useState } from "react"

type Props = {
    isVisible: boolean
    close: any
}

export default function Modal({ isVisible, close }: Props) {
    //const [visible, setVisible] = useState(isVisible)
    if(!isVisible) return null
    return (
        <div onClick={() => close(false)} className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
            Modal
        </div>
    )
}