import Link from 'next/link';
import styles from './credit.module.scss';
import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../../utils/context/userContext';
import axios from 'axios';

// live POST_TRANSACTION_URL = 'https://ipg1.apps.net.pk/Ecommerce/api/Transaction/PostTransaction';
// demo POST_TRANSACTION_URL = 'https://ipguat.apps.net.pk/Ecommerce/api/Transaction/PostTransaction';

const CreditCard = ({ ACCESS_TOKEN }) => {

    const [submitDisable, setSubmitDisable] = useState(true);
    const userDetails = useContext(UserContext);
    const [user, setUser] = userDetails;
    const { name, email, password, country, phoneNumber, plan, paymentMethod, planPrice } = user;

    useEffect(() => {
        const isUser = Object.values({ name, email, password, country, phoneNumber, plan, paymentMethod, planPrice }).every(item => Boolean(item));
        isUser ? setSubmitDisable(false) : setSubmitDisable(true);
    }, [user])

    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    return (
        <>
            <div className={styles.center__container}>
                <div className={styles.main__content}>
                    <form method='POST' action='https://ipg1.apps.net.pk/Ecommerce/api/Transaction/PostTransaction'>
                        <div className={styles.voucher__container}>
                            <div>
                                <div className={styles.header}>
                                    <span>STEP <b>4</b> OF <b>4</b></span>
                                </div>
                            </div>

                            <div className={styles.field__container}>
                                <input hidden type='text' name='MERCHANT_ID' value='14392' readOnly />
                                <input hidden type='text' name='MERCHANT_NAME' value='Playeon' readOnly />
                                <input hidden type='text' name='TOKEN' value={ACCESS_TOKEN} readOnly />
                                <input hidden type='text' name='PROCCODE' value='00' readOnly />
                                <input hidden type='text' name='TXNAMT' value={planPrice} readOnly />
                                <input hidden type='text' name='CUSTOMER_MOBILE_NO' value={phoneNumber} readOnly />
                                <input hidden type='text' name='CUSTOMER_EMAIL_ADDRESS' value={email} readOnly />
                                <input hidden type='text' name='SIGNATURE' value='playeonPayment' readOnly />
                                <input hidden type='text' name='VERSION' value='v1' readOnly />
                                <input hidden type='text' name='TXNDESC' value={plan} readOnly />
                                <input hidden type='text' name='SUCCESS_URL' value="https://www.playeon.com/signup/success" readOnly />
                                <input hidden type='text' name='FAILURE_URL' value='https://www.playeon.com/signup/failure' readOnly />
                                <input hidden type='text' name='BASKET_ID' value='101' readOnly />
                                <input hidden type='text' name='ORDER_DATE' value={date} readOnly />
                                <input hidden type='text' name='CHECKOUT_URL' value='https://apiv1.playeon.com/api/v1/signup/payment/confirmation' readOnly />

                            </div>

                            <div className={styles.field_content}>

                            </div>
                        </div>

                        <div className={styles.btn__container}>
                            <button disabled={submitDisable} type='submit'>Pay Through Payfast</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default CreditCard;


