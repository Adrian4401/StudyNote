import React, { createContext, useState, useContext } from "react";
import { lightTheme, darkTheme } from "../utils/colors";


const DarkModeContext = createContext()


export const DarkModeProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(true)

    const changeDarkMode = (mode) => {
        setDarkMode(mode)
    }

    const theme = darkMode ? darkTheme : lightTheme

    return (
        <DarkModeContext.Provider value={{ darkMode, changeDarkMode, theme }}>
            {children}
        </DarkModeContext.Provider>
    )
}

export const useDarkMode = () => {
    return useContext(DarkModeContext)
}