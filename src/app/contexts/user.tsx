'use client'

import { Dispatch, SetStateAction, createContext, useContext, useState } from "react"

type Vacancy = {
    id: string,
    localization: string,
    occupied: string,
    type: string
}

interface ContextProps {
    userId: string,
    setUserId: Dispatch<SetStateAction<string>>,
    userName: string
    setUserName: Dispatch<SetStateAction<string>>
    vacancy: Vacancy | undefined
    setVacancy: Dispatch<SetStateAction<Vacancy | undefined>>
}

const GlobalContext = createContext<ContextProps>({
    userId: '',
    setUserId: (): string => '',
    userName: '',
    setUserName: (): string => '',
    vacancy: undefined,
    setVacancy: (): Vacancy | undefined => undefined 
})

export const GlobalContextProvider = ({ children }: any) => {
    const [userId, setUserId] = useState('')
    const [userName, setUserName] = useState('')
    const [vacancy, setVacancy] = useState<Vacancy | undefined>(undefined)

    return (
        <GlobalContext.Provider value={{ userId, setUserId, userName, setUserName, vacancy, setVacancy }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => useContext(GlobalContext)