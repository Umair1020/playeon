import Link from 'next/link';
import React, { useState, useEffect, useContext } from 'react';
import styles from './payment.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft, faSackDollar, faLock, faKey, faTicket, faCreditCard, faJ, faE, faTrailer, faFireExtinguisher, faGifts } from '@fortawesome/free-solid-svg-icons';
import { UserContext } from '../../../utils/context/userContext';
import { useRouter } from "next/router";

const Payments = () => {
    const router = useRouter();
    const userDetails = useContext(UserContext);
    const [user, setUser] = userDetails;
    const { paymentMethod } = user;

    const [submitDisable, setSubmitDisable] = useState(true);
    useEffect(() => {
        const isPaymentMehtod = Object.values({ paymentMethod }).every(item => Boolean(item));
        isPaymentMehtod ? setSubmitDisable(false) : setSubmitDisable(true);
    }, [user])
    const handleChange = event => {
        const { name, value } = event.target;
        setUser(prev => ({ ...prev, [name]: value }));
    }

    return (
        <>
            <div className={styles.center__container}>
                <div className={styles.main__content}>


                    <div className={styles.payment__header}>

                        <div className={styles.logo__container}>
                            <span className={styles.logo}>
                                <i class="fas fa-lock"></i>
                            </span>
                        </div>

                        <div className={styles.header__container}>
                            <div className={styles.header__content}>
                                <span>STEP <b>3</b> OF <b>4</b></span>
                                <h1>Set up your payment</h1>
                            </div>
                        </div>

                        <div className={styles.narrow__container}>
                            <div className={styles.context__row}>
                                Your membership starts as soon as you set up payment.
                            </div>
                            <div className={styles.context__row_sub}>
                                <div className={styles.contextRowEmphasized}>No commitments.</div>
                            </div>
                        </div>

                    </div>







                    <div className={styles.payment__badge}>
                        <div className={styles.badge__name}>Secure Server</div>
                        <FontAwesomeIcon icon={faKey} style={{ color: 'yellow', marginRight: '5px', fontSize: '11px' }} />
                    </div>






                    <div className={styles.payment__methods}>
                        <div>

                        <div className={styles.selectionWrapper}>
                                <a>
                                    <label className={styles.name__and__logo} >
                                        <input type='radio' name='paymentMethod' value='free' onChange={handleChange} onClick={() => router.push('/signup/trial')} />
                                        <div className={styles.card__type}>
                                            <span>Free Three Days Subscription</span>
                                            <FontAwesomeIcon
                                                icon={faGifts}
                                                style={{
                                                    marginLeft:'20px',
                                                    fontSize:'25px',
                                                    color:'crimson'
                                                }}
                                            />
                                        </div>
                                    </label>
                                </a>
                            </div>


                            <div className={styles.selectionWrapper}>
                                <a>

                                    <label className={styles.name__and__logo}>
                                        <input type='radio' name='paymentMethod' value='card' onChange={handleChange} onClick={() => router.push('/signup/creditoption')} />
                                        <div className={styles.card__type}>
                                            <span>Card or JazzCash</span>
                                            <FontAwesomeIcon
                                                icon={faCreditCard}
                                                style={{
                                                    marginLeft:'20px',
                                                    fontSize:'25px',
                                                    color:'#ADD8E6'
                                                }}
                                            />
                                             <FontAwesomeIcon
                                                icon={faJ}
                                                style={{
                                                    marginLeft:'20px',
                                                    fontSize:'25px',
                                                    color:'crimson'
                                                }}
                                            />
                                        </div>
                                     
                                    </label>

                                </a>
                            </div>


                            <div className={styles.selectionWrapper}>
                                <a>
                                    <label className={styles.name__and__logo} >
                                        <input type='radio' name='paymentMethod' value='voucher' onChange={handleChange} onClick={() => router.push('/signup/voucheroption')} />
                                        <div className={styles.card__type}>
                                            <span>Voucher Code</span>
                                            <FontAwesomeIcon
                                                icon={faTicket}
                                                style={{
                                                    marginLeft:'20px',
                                                    fontSize:'25px',
                                                    color:'#F7AE00'
                                                }}
                                            />
                                        </div>
                                    </label>
                                </a>
                            </div>
                        </div>
                    </div>




                </div>
            </div>
        </>
    );
};

export default Payments;
