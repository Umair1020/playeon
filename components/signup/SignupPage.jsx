import Link from 'next/link';
import React, { useState, useEffect, useContext } from 'react';
import styles from './signup.module.scss';
// For passing regex expression text for username
const regexUserName = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faCircleXmark, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { ErrorToastr, LoadingState } from '../layout/Toastr';
import Loading from '../loading-spinner/Loading';
import axios from 'axios';
import baseUrl from '../../utils/baseUrl';
import { checkEmail, checkUserDetails, registerUser } from '../../utils/authUser';
import ErrorComponent from '../common/ErrorComponent';
import { UserContext } from '../../utils/context/userContext';
import { useRouter } from "next/router";
import { countryList } from '../../utils/countries';



let cancel;

const SignupPage = ({ Navigation, step }) => {

    const router = useRouter();
    const userDetails = useContext(UserContext);
    const [user, setUser] = userDetails;
    const [submitDisable, setSubmitDisable] = useState(true);
    const [showPassword, setShowPassowrd] = useState(false);
    const [username, setUserName] = useState('');
    const [usernameAvailable, setUsernameAvailable] = useState(false);
    const [usernameLoading, setUsernameLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);
    const [formLoading, setFormLoading] = useState(false);
    const [usernameLen, setusernameLen] = useState(false);
    const { name, email, password, country, phoneNumber ,BdoId } = user;


    // if fields empty disable next button
    useEffect(() => {
        const isUser = Object.values({ name, username, email, password, country, phoneNumber }).every(item => Boolean(item));
        isUser ? setSubmitDisable(false) : setSubmitDisable(true);
        if(phoneNumber.length<11)
        {
            isUser = setSubmitDisable(true)
        }
        else if(phoneNumber.length>11)
        {
            isUser = setSubmitDisable(true)
        }
        else if(username<4){
            setusernameLen(true)
        }
     
    }, [user])

    // input handler
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prev => ({ ...prev, [name]: value }));
    }
    // form submit handler
    const submitHandler = async (e) => {
        e.preventDefault();
        await checkUserDetails(user, router, setFormLoading, setErrorMsg);
    }
    // Checking Username
    const checkUsername = async () => {
        setUsernameLoading(true);
        try {
            cancel && cancel();
            const CancelToken = axios.CancelToken;
            const res = await axios.get(`${baseUrl}/signup/${username}`, {
                cancelToken: new CancelToken(canceler => {
                    cancel = canceler;
                })
            });
            if (errorMsg !== null) setErrorMsg(null);
            if (res.data === "Available") {
                setUsernameAvailable(true);
                setUser(prev => ({ ...prev, username }));
            }
        } catch (error) {
            // setErrorMsg('Username not available')
            setUsernameAvailable(false);
        }
        setUsernameLoading(false);
    }

    useEffect(() => {
        username === "" ? setUsernameAvailable(false) : checkUsername();
    }, [username])

    useEffect(() => {
        errorMsg && setTimeout(() => {
            setErrorMsg(null);
        }, 3000);
    }, [errorMsg])

    return (
        <>
            {formLoading && <Loading />}

            <div className={styles.center__container}>
                <form onSubmit={submitHandler}>
                    <div className={styles.reg__form}>

                        <div className={styles.header}>
                            <span>STEP <b>1</b> OF <b>4</b></span>
                            <h1>Welcome!</h1>
                            <span>It only takes a minute</span>
                        </div>
                        <div className={styles.form__inputs}>


                            {errorMsg && <ErrorComponent errorMsg={errorMsg} />}
                            <input type='text'
                                placeholder='Name'
                                name='name'
                                autoComplete='off'
                                value={name}
                                onChange={handleChange} />

                            <div className={styles.customDiv}>
                                <input
                                    type='text'
                                    placeholder='Username'
                                    value={username}
                                    name='username'
                                    autoComplete='off'
                                    onChange={e => {
                                        setUserName(e.target.value);
                                        if (regexUserName.test(e.target.value)) {
                                            setUsernameAvailable(true)
                                        }
                                     
                                         else {
                                            setUsernameAvailable(false)
                                        }
                                    }} />
                                <div className={styles.customDivIcon}>
                                    {usernameAvailable && username.length>=4 ?
                                        <FontAwesomeIcon icon={faCircleCheck} style={{ color: '13b164' }} />
                                        :
                                        <FontAwesomeIcon icon={faCircleXmark} style={username === "" ? { color: 'transparent', fontSize: '25px' } : { color: 'crimson' }} />
                                    }
                                </div>
                            </div>
                            <input type='email'
                                placeholder='Email'
                                value={email}
                                name='email'
                                autoComplete='off'
                                onChange={handleChange} />
                            <div className={styles.customDiv}>
                                <input type={showPassword ? 'text' : 'password'}
                                    placeholder='Password'
                                    value={password}
                                    name='password'
                                    autoComplete='off'
                                    onChange={handleChange} />
                                <div className={styles.customDivIcon}>
                                    {password.length > 0 &&
                                        <FontAwesomeIcon
                                            icon={showPassword ? faEye : faEyeSlash}
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => setShowPassowrd(!showPassword)} />
                                    }
                                </div>
                            </div>

                            <input className={styles.no__arrow}
                                type='number'
                                value={phoneNumber}
                                placeholder='Number'
                                maxLength='13'
                                name='phoneNumber'
                                autoComplete='off'
                                onChange={handleChange} />
                               

                            <select name='country' onChange={handleChange}>
                                <option selected disabled>Choose Your City</option>
                                {countryList.map((country) => (
                                    <option>{country}</option>
                                ))}
                            </select>
                            <input className={styles.no__arrow}
                                type='text'
                                value={BdoId}
                                placeholder='Enter Your Referal Code'
                                maxLength='13'
                                name='BdoId'
                                autoComplete='off'
                                onChange={handleChange} />
                        </div>


                        <div className={styles.btn__container}>
                            {/* <Link href='/signup/planform'> */}
                            {/* <button disabled={submitDisable || !usernameAvailable} type='submit'>
                                Next
                            </button> */}
                            <button disabled={submitDisable || !usernameAvailable} type='submit'>
                                NEXT
                            </button>
                            {/* </Link> */}
                        </div>

                    </div>
                </form>
            </div>
        </>
    )
};







export default SignupPage;
