import React, { useState, useEffect } from 'react';
import styles from './login.module.scss';
import Link from 'next/link';
import ErrorComponent from '../common/ErrorComponent';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faCircleXmark, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import cookie from 'js-cookie';
import { loginUser } from '../../utils/authUser';
import Loading from '../loading-spinner/Loading';
import Image from 'next/image';

const Login = () => {
    const [user, setUser] = useState({
        username: '',
        password: ''
    })
    const { username, password } = user;
    const [showPassword, setShowPassword] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);
    const [formLoading, setFormLoading] = useState(false);
    const [submitDisable, setSubmitDisable] = useState(true);

    useEffect(() => {
        const isUser = Object.values({ username, password }).every(item => Boolean(item));
        isUser ? setSubmitDisable(false) : setSubmitDisable(true);
    }, [user])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prev => ({ ...prev, [name]: value }));
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        await loginUser(user, setErrorMsg, setFormLoading);
    }

    useEffect(() => {
        const userEmail = cookie.get('userEmail');
        if (userEmail) setUser(prev => ({ ...prev, email: userEmail }));

    }, [])


    return (
        <>

            <div className={styles.modal}>

                <div className={styles.logo}>
                    <Link href='/'>
                        <img src="/logotrans.png" alt='playeon' />
                    </Link>
                </div>
                <div className={styles.modal__box}>
                    <div className={styles.modal__header}>
                        <h3>Log In</h3>

                    </div>
                    <div className={styles.modal__body}>
                        {errorMsg && <ErrorComponent errorMsg={errorMsg} />}
                        {formLoading && <Loading />}
                        <form onSubmit={handleSubmit}>
                            <div className={styles.form__control}>
                                <input
                                    onChange={handleChange}
                                    type="text"
                                    id="text"
                                    name='username'
                                    autoComplete='off'
                                    value={username}
                                    placeholder='Username' />

                            </div>
                            <div className={styles.form__control}>
                                <input
                                    onChange={handleChange}
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    name='password'
                                    placeholder='Password' />
                                <div className={styles.customDivIcon}>
                                    {password.length > 0 &&
                                        <FontAwesomeIcon
                                            icon={showPassword ? faEye : faEyeSlash}
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => setShowPassword(!showPassword)} />
                                    }
                                </div>
                                <div className={styles.form__controls_div}>
                                    <div className={styles.form__controls}>
                                        <input type='checkbox' />
                                        <p>Remember me</p>
                                    </div>
                                    <div className={styles.form__controls}>
                                        <Link href={'/reset'}><p>Forgot password?</p></Link>
                                    </div>
                                </div>
                            </div>
                            <button
                                disabled={submitDisable} type='submit'
                                className={styles.btn}>
                                Login
                            </button>
                        </form>
                    </div>
                    <div className={styles.modal__footer}>
                        {/* <p>Account Logged In? <Link href='/logout'><a>Logout here</a></Link></p> */}
                        <p>Don't have an account? <Link href='/signup'><a>Create an account</a></Link></p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login