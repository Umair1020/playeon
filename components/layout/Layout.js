import { useRouter } from 'next/router';
import React, { useContext, createContext, useState, useEffect } from 'react';
import Footer from '../footer/Footer';
import Header from '../header/Header';
import Head from 'next/head';
import Script from 'next/script';
import HeadTags from './HeadTags';
import { UserDataProvider } from '../../utils/context/userContext';
import StickyLink from '../user/sticky-link/StickyLink';
import { ThemeContext, ThemeProvider } from '../../utils/context/theme';
import { AdvertismentContext } from '../../utils/context/adContext';


export const ShowAdvertistmentContext = createContext();

const Layout = ({ children, user }) => {
    const { pathname } = useRouter();
    const [showAdvertisment, setShowAdvertisment] = useState(true);

    useEffect(() => {
        const data = window.localStorage.getItem('SHOW_ADVERTISMENT');
        setShowAdvertisment(JSON.parse(data));
    }, [])


    useEffect(() => {
        window.localStorage.setItem('SHOW_ADVERTISMENT', JSON.stringify(showAdvertisment))
    }, [showAdvertisment])



    return (
        <>
            <Head>
                <title>Playeon - Watch Movies Online , Watch Series Online</title>
            </Head>
            {user ? <>
                <Header user={user} />
                {showAdvertisment && <StickyLink
                    showAdvertisment={showAdvertisment}
                    setShowAd={setShowAdvertisment} />}
                {children}
                <Footer />
            </> : <>

                <ShowAdvertistmentContext.Provider value={[showAdvertisment, setShowAdvertisment]}>
                    <UserDataProvider>
                        {children}
                    </UserDataProvider>
                </ShowAdvertistmentContext.Provider>
            </>}



        </>
    );
};

export default Layout;
