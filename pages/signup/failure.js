import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState, useEffect, useContext } from 'react';
import Navbar from '../../components/landing-navbar/Navbar';


const Failure = () => {
    const router = useRouter();
    const err_code = router.query.err_code;
    const err_msg = router.query.err_msg;

    if (!err_code) {
        return (
            <>
                <Navbar />
                <div style={
                    {
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        color: 'crimson',
                        marginTop: '10%'
                    }
                }>
                    <Link href={'/'}>
                        <h1 style={{ cursor: 'pointer' }}>Error 404 Page Not Found</h1>
                    </Link>
                </div>
            </>
        )
    }

    return (
        <>
            <h1>ERROR {err_code}</h1>
            {err_msg && <p>{err_msg}</p>}
        </>
    )
}

export default Failure