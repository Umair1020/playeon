import { useState, useEffect } from 'react'
import styles from '../../components/login/login.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faGears } from "@fortawesome/free-solid-svg-icons";
import baseUrl from '../../utils/baseUrl';
import catchErrors from '../../utils/catchErrors';
import Loading from '../../components/loading-spinner/Loading';
import { ErrorToastr } from '../../components/layout/Toastr';
import Link from 'next/link';
import axios from 'axios';

const index = () => {
    const [email, setEmail] = useState('');
    const [errorMsg, setErrorMsg] = useState(null);
    const [formLoading, setFormLoading] = useState(false);
    const [successfulLogout, setSuccessfulLogout] = useState(false);
    useEffect(() => {
        errorMsg && setTimeout(() => {
            setErrorMsg(null);
        }, 3000);
    }, [errorMsg])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormLoading(true);
        try {
            await axios.post(`${baseUrl}/reset/loggedinuser`, { email });
            setSuccessfulLogout(true);
        } catch (err) {
            const error = catchErrors(err);
            setErrorMsg(error);
        }
        setFormLoading(false)
    }

    return (
        <>
            {errorMsg && <ErrorToastr error={errorMsg} />}
            <div className={styles.modal}>
                <div className={styles.logo}>
                    <Link href='/'>
                        <img src="/logotrans.png" alt='playeon' />
                    </Link>
                </div>

                <div className={styles.modal__box}>
                    <div className={styles.modal__header}>
                        {successfulLogout ?
                            (<p style={{ backgroundColor: 'blue', padding: "15px" }}><FontAwesomeIcon icon={faCheck} style={{ marginRight: '5px', marginLeft: '5px', fontWeight: 'bold' }} />
                                Account logout out successfully!</p>) :
                            (<h3><FontAwesomeIcon icon={faGears} style={{ marginRight: '5px' }} />
                                Account Logout</h3>)}
                    </div>
                    {successfulLogout ?

                        <div className={styles.successfullLogout}>
                            <Link href={'/login'}>
                                <button className={styles.btn}>
                                    Login
                                </button>
                            </Link>
                        </div>



                        : <div className={styles.modal__body}>
                            {formLoading && <Loading />}
                            <form onSubmit={handleSubmit}>
                                <div className={styles.form__control}>
                                    <input
                                        onChange={e => setEmail(e.target.value)}
                                        type="email"
                                        id="email"
                                        name='email'
                                        autoComplete='off'
                                        value={email}
                                        placeholder='Enter your email' />

                                </div>
                                <button type='submit'
                                    disabled={email === ''}
                                    className={styles.btn}>
                                    Logout Account
                                </button>
                            </form>
                        </div>
                    }
                </div>

            </div>
        </>
    )
}

export default index