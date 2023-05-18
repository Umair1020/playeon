import { createContext, useEffect, useState } from "react";


export const AdvertismentContext = createContext();

export const AdvertismentDataProvider = ({ children }) => {
    const [isActive, setIsActive] = useState(true);

    const toggleAdvertisment = () => {
        localStorage.setItem('isActive', JSON.stringify(!isActive));
        setIsActive(!isActive)
    }
    useEffect(() => {
        const isActive = localStorage.getItem('isActive') === "true";
        setIsActive(isActive);
    }, [])

    return (
        <AdvertismentContext.Provider
            value={[{ isActive, setIsActive }, toggleAdvertisment]}>
            {children}
        </AdvertismentContext.Provider>
    )
}