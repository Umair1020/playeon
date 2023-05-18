import { createContext, useEffect, useState } from "react";


export const UserContext = createContext();

export const UserDataProvider = ({ children }) => {
    // 4cfc652d-4e33-ff54-d88d-86214fe6ac97
    // b3a40ba0-1c02-a41a-e410-976fbd132555
    // 69029269-c704-5e31-eabb-3bea72c847b0
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        phoneNumber: '',
        country: '',
        plan: 'planOne',
        planPrice: '100',
        paymentMethod: '',
        voucher: '',
    });
    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            setUser(JSON.parse(user));
        }
    }, [])
    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(user));
    }, [user])

    return (
        <UserContext.Provider value={[user, setUser]}>
            {children}
        </UserContext.Provider>
    )
}