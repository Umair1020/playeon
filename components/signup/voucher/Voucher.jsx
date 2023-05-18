import Link from 'next/link';
import React, { useState, useEffect, useContext } from 'react';
import styles from './voucher.module.scss';
import { UserContext } from '../../../utils/context/userContext';
import Loading from '../../loading-spinner/Loading';
import { ErrorToastr } from '../../layout/Toastr';
import { registerUser } from '../../../utils/authUser';


const Voucher = () => {
    const userDetails = useContext(UserContext);
    const [user, setUser] = userDetails;
    const { voucher } = user;
    const [submitDisable, setSubmitDisable] = useState(true);
    const [error, setError] = useState(null);
    const [formLoading, setFormLoading] = useState(false);
    useEffect(() => {
        const isVoucher = Object.values({ voucher }).every(item => Boolean(item));
        isVoucher ? setSubmitDisable(false) : setSubmitDisable(true);
    }, [user])
    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser(prev => ({ ...prev, [name]: value }));
    }
    useEffect(() => {
        error && setTimeout(() => {
            setError(null);
        }, 3000);
    }, [error])

    const submitHandler = async (event) => {
        event.preventDefault();
        await registerUser(user, setError, setFormLoading);
    }
    return (
        <>
            {formLoading && <Loading />}
            {error && <ErrorToastr error={error} />}
            <div className={styles.center__container}>
                <div className={styles.main__content}>
                    <form onSubmit={submitHandler}>
                        <div className={styles.voucher__container}>
                            <div>
                                <div className={styles.header}>
                                    <span>STEP <b>4</b> OF <b>4</b></span>
                                    <h1>Enter Voucher Code</h1>
                                </div>
                            </div>

                            <div className={styles.field__container}>
                                <input
                                    placeholder='Voucher Code'
                                    name='voucher'
                                    value={voucher}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className={styles.btn__container}>
                            <button type='submit' disabled={submitDisable}>
                                PROCEED
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Voucher;
