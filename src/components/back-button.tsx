import { useRouter } from "next/navigation";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";

export default function BackButton() {
    const router = useRouter()
    
    return (
        <button className="flex align-middle-center bg-white text-purple-500 text-3xl hover:opacity-80 transition duration-300"
            onClick={() => router.push('/home')}>
            <BsFillArrowLeftCircleFill size={40} />
            <text className="flex ml-2">Voltar</text>
        </button>
    )
}