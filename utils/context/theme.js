import { createContext, useEffect, useState } from "react";

const themes = {
    dark: {
        color: 'white',
        backgroundColor: '#0f0f0f'
    },
    light: {
        color: '#119d57',
        backgroundImage: 'url(/theme.png)',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'top',
        backgroundSize: 'cover'
    }
}


export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [isDark, setIsDark] = useState(true);
    const theme = isDark ? themes.light : themes.dark;
    const toggleTheme = () => {
        localStorage.setItem('isDark', JSON.stringify(!isDark));
        setIsDark(!isDark)
    }
    useEffect(() => {
        const isDark = localStorage.getItem('isDark');
        setIsDark(isDark);
    }, [])

    return (
        <ThemeContext.Provider value={[{ theme, isDark }, toggleTheme]}>
            {children}
        </ThemeContext.Provider>
    )
}

