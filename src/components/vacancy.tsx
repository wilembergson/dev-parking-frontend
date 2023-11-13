import { useGlobalContext } from "@/app/contexts/user"
import { FaMotorcycle } from "react-icons/fa"
import { useRouter } from "next/navigation"
import { AiFillCar } from "react-icons/ai"

type Props = {
    setLoading: any,
    vacancy: {
        id: string,
        localization: string,
        occupied: string,
        type: string
    }
}

export default function Vacancy({ vacancy, setLoading }: Props) {
    const { setVacancy } = useGlobalContext()
    const { id, localization, occupied, type } = vacancy
    const router = useRouter()

    function loadScheduleForm() {
        setLoading(true)
        setVacancy(vacancy)
        if(occupied){
            router.push('/occupied-schedule')
        }else{
            router.push('/new-schedule')
        }
    }

    return (
        <section key={id} onClick={() => loadScheduleForm()}
            className={`flex font-principal flex-col items-center justify-center w-vacancy-width hover:opacity-80 transition duration-300
            cursor-pointer m-2 py-2 text-white rounded-lg ${occupied ? 'bg-red-600' : 'bg-green-500'}`}
        >
            {type === 'CAR' ? <AiFillCar size={42} /> : <FaMotorcycle size={42} />}
            <h1 className="flex text-3xl">
                {localization}
            </h1>
            <h2 className="flex text-md">
                {occupied ? 'Ocupado' : 'Disponível'}
            </h2>
        </section>
    )
}