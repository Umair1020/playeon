import React, { useEffect, useState, useContext } from 'react'
import styles from './trail.module.scss';
import { UserContext } from '../../../utils/context/userContext';
import { registerUserWithTrail } from '../../../utils/authUser';
import Loading from '../../loading-spinner/Loading';
import { ErrorToastr } from '../../layout/Toastr';
const TrailComponent = () => {
    const [submitDisable, setSubmitDisable] = useState(true);
    const userDetails = useContext(UserContext);
    const [user, setUser] = userDetails;
    const [error, setError] = useState(null);
    const [formLoading, setFormLoading] = useState(false);
    const { name, email, password, country, phoneNumber, plan, paymentMethod, planPrice } = user;
    useEffect(() => {
        const isUser = Object.values({ name, email, password, country, phoneNumber, plan, paymentMethod, planPrice }).every(item => Boolean(item));
        isUser ? setSubmitDisable(false) : setSubmitDisable(true);
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await registerUserWithTrail(user, setError, setFormLoading);
    }

    useEffect(() => {
        error && setTimeout(() => {
            setError(null);
        }, 3000);
    }, [error])

    return (
        <>
            {formLoading && <Loading />}
            {error && <ErrorToastr error={error} />}
            <div className={styles.center__container}>
                <div className={styles.main__content}>
                    <form onSubmit={handleSubmit}>
                        <div className={styles.voucher__container}>
                            <div>
                                <div className={styles.header}>
                                    <span>STEP <b>4</b> OF <b>4</b></span>
                                </div>
                            </div>
                        </div>

                        <div className={styles.btn__container}>
                            <button disabled={submitDisable} type='submit'>Start Your 3 Days Trial</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default TrailComponent