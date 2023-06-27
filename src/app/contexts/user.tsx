'use client'

import { Dispatch, SetStateAction, createContext, useContext, useState } from "react"

interface ContextProps {
    userId: string,
    setUserId: Dispatch<SetStateAction<string>>,
    userName: string
    setUserName: Dispatch<SetStateAction<string>>
}

const GlobalContext = createContext<ContextProps>({
    userId: '',
    setUserId: (): string => '',
    userName: '',
    setUserName: (): string => ''
})

export const GlobalContextProvider = ({ children }: any) => {
    const [userId, setUserId] = useState('')
    const [userName, setUserName] = useState('')

    return (
        <GlobalContext.Provider value={{ userId, setUserId, userName, setUserName }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => useContext(GlobalContext)