'use client'
import Header from "@/components/Header";
import LogoutModal from "@/components/logout-modal";
import Main from "@/components/main";
import PrivateRoute from "@/components/private-route";
import { useEffect, useState } from "react";
import { useGlobalContext } from "../contexts/user";
import { useRouter } from "next/navigation";
import { errorToast, infoToast } from "@/utils/toasts";
import api, { SaveScheduleData } from "@/api/api-connections";
import NewCustomerModal from "@/components/new-customer-modal";
import { BsCheckAll } from "react-icons/bs";

type FormData = {
    rg: number | undefined,
    vehiclePlate: string,
    pricePerHour: string
}

type Customer = {
    id: {
        value: string
    },
    name: string,
    rg: number
}

export default function NewSchedule() {
    const token: any = localStorage.getItem('token')
    const router = useRouter()
    const { userName, vacancy } = useGlobalContext()
    const [customer, setCustomer] = useState<Customer | undefined>(undefined)
    const [showLogout, setShowLogout] = useState(false)
    const [showCustomerModal, setShowCustomerModal] = useState(false)

    const [formData, setFormData] = useState<FormData>({
        rg: undefined,
        pricePerHour: '',
        vehiclePlate: ''
    })

    function handleChange({ target }: any) {
        setFormData({ ...formData, [target.name]: target.value })
    }

    async function getCustomer() {
        try {
            const rg = formData.rg!.toString()
            const customer = await api.getCustomer(rg, token)
            setCustomer(customer.data)
        } catch (error: any) {
            setShowCustomerModal(true)
            const errorMessage = (
                (error.response.data.message.message)
                    ? error.response.data.message.message[0]
                    : error.response.data.message
            )
            infoToast(errorMessage)
        }
    }

    async function saveSchedule() {
        console.log(customer?.id!.value!)
        try {
            const scheduleData: SaveScheduleData = {
                vehiclePlate: formData.vehiclePlate,
                pricePerHour: parseFloat(formData.pricePerHour),
                customerId: customer?.id!.value!,
                vacancyId: vacancy?.id!
            }
            await api.saveSchedule(scheduleData, token)
            router.push('/home')
        } catch (error: any) {
            const errorMessage = (
                (error.response.data.message.message)
                    ? error.response.data.message.message[0]
                    : error.response.data.message
            )
            errorToast(errorMessage)
        }
    }

    useEffect(() => {
        if (!vacancy)
            router.push('/home')
    })

    return (
        <PrivateRoute>
            <>
                <Header showLogout={setShowLogout} />
                <Main>
                    <section className='flex justify-center font-principal items-center sm:w-3/5 w-full pt-4 pb-2 sm:px-0 px-2 border border-b-0 border-t-0 border-x-0 border-gray-clear'>
                        <h1 className='text-5xl text-gray-clear font-black mr-4 mt-4'>
                            Nova reserva
                        </h1>
                    </section>
                    <div className=" flex font-principal sm:w-3/5 w-full mt-4">
                        <div className="flex flex-col w-2/5">
                            <section className='flex justify-start items-center w-full pt-4 pb-2 sm:px-0 px-2 mt-6 border border-b-1 border-t-0 border-x-0 border-gray-clear'>
                                <h1 className='text-2xl text-yellow font-black mr-4'>
                                    Infomeções da vaga
                                </h1>
                            </section>
                            <section className='flex flex-col justify-start items-start sm:w-3/5 w-full pt-4 pb-2 sm:px-0 px-2 mt-2'>
                                <h1 className='text-xl text-gray-clear font-black mr-4'>
                                    <span className="text-purple-500">Localização:</span> {vacancy?.localization}
                                </h1>
                                <h1 className='text-xl text-gray-clear font-black mr-4'>
                                    <span className="text-purple-500">Veículo:</span> {vacancy?.type === 'CAR' ? 'Carro' : 'Moto'}
                                </h1>
                                <h1 className='text-xl text-gray-clear font-black mr-4'>
                                    <span className="text-purple-500">Status:</span> {vacancy?.occupied ? 'Ocupada' : 'Disponível'}
                                </h1>
                            </section>
                        </div>
                        <div className="flex flex-col  items-center w-3/5">
                            <section className='flex justify-center items-center w-full pt-4 pb-2 sm:px-0 px-2 mt-6 border border-b-1 border-t-0 border-x-0 border-gray-clear'>
                                <h1 className='text-2xl text-yellow font-black mr-4'>
                                    Informações do cliente
                                </h1>
                            </section>
                            <section className='flex justify-center items-center w-full pt-4 pb-2 sm:px-0 px-2 mt-2'>
                                <h1 className='text-xl text-gray-clear font-black mr-4'>
                                    <span className="text-purple-500">RG: </span>
                                </h1>
                                <input className='flex bg-slate-200 focus:outline-none p-2 rounded-lg'
                                    type="number"
                                    placeholder="RG"
                                    onChange={(e: any) => handleChange(e)}
                                    name="rg"
                                    value={formData.rg}
                                    maxLength={9}
                                    required
                                />
                            </section>
                            {formData.rg && formData.rg.toString().length === 9 ?
                                <button className="flex w-max p-2 mt-2 text-lg rounded-lg bg-yellow text-white hover:opacity-70 transition duration-300"
                                    onClick={() => getCustomer()}>
                                    continuar
                                </button> : <></>}
                            {(customer !== undefined && customer.rg === formData.rg) ?
                                <div className="flex flex-col items-center  mt-5 w-full">
                                    <section className='flex flex-col justify-start items-center w-full pt-4 pb-2 sm:px-0 px-2 mt-2'>
                                        <h1 className='flex text-xl text-gray-clear font-black mr-4'>
                                            <span className="text-purple-500">Placa</span>
                                        </h1>
                                        <input className='flex bg-slate-200 focus:outline-none p-2 rounded-lg'
                                            type="text"
                                            placeholder="Placa"
                                            onChange={(e: any) => handleChange(e)}
                                            name="vehiclePlate"
                                            value={formData.vehiclePlate}
                                            required
                                        />
                                    </section>
                                    <section className='flex flex-col justify-start items-center w-full pt-4 pb-2 sm:px-0 px-2 mt-2'>
                                        <h1 className='text-xl text-gray-clear font-black mr-4'>
                                            <span className="text-purple-500">Preço por hora</span>
                                        </h1>
                                        <input className='flex bg-slate-200 focus:outline-none p-2 rounded-lg'
                                            type="number"
                                            placeholder="Preço"
                                            onChange={(e: any) => handleChange(e)}
                                            name="pricePerHour"
                                            value={formData.pricePerHour}
                                            required
                                        />
                                    </section>
                                    <button className="flex items-center font-principal text-2xl my-6 text-white  bg-green-500 px-4 py-2 rounded-lg hover:opacity-70 transition duration-500"
                                        onClick={() => saveSchedule()}>
                                        <BsCheckAll size={32} />Salvar
                                    </button>
                                </div>
                                : <></>}
                        </div>
                    </div>
                </Main>
            </>
            <NewCustomerModal isVisible={showCustomerModal} rg={formData.rg!} onClick={() => setShowCustomerModal(false)} />
            <LogoutModal isVisible={showLogout} onClick={() => setShowLogout(false)} />
        </PrivateRoute>
    )
}