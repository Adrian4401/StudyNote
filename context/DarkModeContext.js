import React, { createContext, useState, useContext } from "react";


const DarkModeContext = createContext()


export const DarkModeProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(true)

    const changeDarkMode = (mode) => {
        setDarkMode(mode)
    }

    return (
        <DarkModeContext.Provider value={{ darkMode, changeDarkMode }}>
            {children}
        </DarkModeContext.Provider>
    )
}

export const useDarkMode = () => {
    return useContext(DarkModeContext)
}