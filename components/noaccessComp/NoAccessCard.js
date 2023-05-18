import { useState, useEffect } from 'react';
import styles from './cantaccess.module.scss';
import { CapitilizeFirstLetter } from '../../utils/utilityFunctions';
import Loading from '../loading-spinner/Loading';
import { ErrorToastr, SuccessToaster } from '../layout/Toastr';
import { upgradeUserPlan } from '../../utils/upgradePlan';
import { renewVoucherAccount } from '../../utils/renewVoucherAccount';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCreditCard, faGift, faGifts, faJ, faTicket } from '@fortawesome/free-solid-svg-icons';




// live POST_TRANSACTION_URL = 'https://ipg1.apps.net.pk/Ecommerce/api/Transaction/PostTransaction';
// demo POST_TRANSACTION_URL = 'https://ipguat.apps.net.pk/Ecommerce/api/Transaction/PostTransaction';

// PRODUCTION Sucess URL = https://www.playeon.com/cantaccess
// PRODUCTION Failure URL = https://www.playeon.com/cantaccess

// DEV Sucess URL = http://localhost:4000/cantaccess
// DEV Failure URL = http://localhost:4000/cantaccess

const NoAccessCard = ({ ACCESS_TOKEN, user, router }) => {
    const { _id, name, nextPaymentDate, profilePicture, phoneNumber, email, voucherExpiryDate, paymentMethod } = user;

    const { selectedPlan, planPrice } = user;


    const [formLoading, setFormLoading] = useState(false);
    const [showToaster, setShowToster] = useState(false);
    const [voucher, setVoucher] = useState('');
    const [submitDisable, setSubmitDisable] = useState(true);
    const [error, setError] = useState(null);
    const [showVoucher, setShowVoucher] = useState(false);
    useEffect(() => {
        const isVoucher = Object.values({ voucher }).every(item => Boolean(item));
        isVoucher ? setSubmitDisable(false) : setSubmitDisable(true);
    }, [voucher]);
    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    useEffect(() => {
        const isPlan = Object.values({ selectedPlan, planPrice }).every(item => Boolean(item));
        isPlan ? setSubmitDisable(false) : setSubmitDisable(true);
    }, [user]);

    useEffect(() => {
        error && setTimeout(() => {
            setError(null);
        }, 3000);
    }, [error]);

    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setUser(prev => ({ ...prev, [name]: value }));
    // }

    // const handleUpgradePlan = async (event) => {
    //     event.preventDefault();
    //     await upgradeUserPlan(user, setError, setFormLoading, router, setShowToster);
    // }
    const submitHandler = async (event) => {
        event.preventDefault();
        await renewVoucherAccount(user, voucher, setError, setFormLoading, router);
    }
    return (
        <>
            {showToaster && <SuccessToaster successMsg={'Plan Upgraded Successfully!'} />}
            {formLoading && <Loading />}
            {error && <ErrorToastr error={error} />}
            <div className={styles.voucherContainer}>
                <div className={styles.userDetails}>
                    <div className={styles.voucherTop}>
                        <img src={profilePicture} alt={name} />
                    </div>
                    <div className={styles.voucherBottom}>
                        <h1>Hello <span className={styles.username}>{CapitilizeFirstLetter(name)}</span>,</h1>
                        {paymentMethod === 'card' && <p>Your subscripton ended on <span className={styles.expiry}>{nextPaymentDate.substring(0, 10)}</span></p>}
                        {paymentMethod === 'voucher' && <p>Your voucher is expired on <span className={styles.expiry}>{voucherExpiryDate.substring(0, 10)}</span></p>}
                    </div>

                    <div className={styles.cardMessage}>
                        <form method='POST' action='https://ipg1.apps.net.pk/Ecommerce/api/Transaction/PostTransaction'>
                            <input hidden type='text' name='MERCHANT_ID' value='14392' readOnly />
                            <input hidden type='text' name='MERCHANT_NAME' value='Playeon' readOnly />
                            <input hidden type='text' name='TOKEN' value={ACCESS_TOKEN} readOnly />
                            <input hidden type='text' name='PROCCODE' value='00' readOnly />
                            <input hidden type='text' name='TXNAMT' value='200' readOnly />
                            <input hidden type='text' name='CUSTOMER_MOBILE_NO' value={phoneNumber} readOnly />
                            <input hidden type='text' name='CUSTOMER_EMAIL_ADDRESS' value={email} readOnly />
                            <input hidden type='text' name='SIGNATURE' value='AccountRenewal' readOnly />
                            <input hidden type='text' name='VERSION' value='v1' readOnly />
                            <input hidden type='text' name='TXNDESC' value='Account Renewal' readOnly />
                            <input hidden type='text' name='SUCCESS_URL' value="https://www.playeon.com/cantaccess" readOnly />
                            <input hidden type='text' name='FAILURE_URL' value='https://www.playeon.com/cantaccess' readOnly />
                            <input hidden type='text' name='BASKET_ID' value='101' readOnly />
                            <input hidden type='text' name='ORDER_DATE' value={date} readOnly />
                            <input hidden type='text' name='CHECKOUT_URL' value='https://apiv1.playeon.com/api/v1/signup/payment/confirmation' readOnly />
                            <button type='submit'>
                                <FontAwesomeIcon
                                    icon={faCreditCard}
                                    style={{ marginRight: '5px' }}
                                />
                                Pay Through Card/Wallet</button>
                        </form>

                    </div>
                    <div className={styles.cardMessage}>
                        <button onClick={() => setShowVoucher(!showVoucher)}>
                            <FontAwesomeIcon
                                icon={faTicket}
                                style={{ marginRight: '5px' }}
                            />
                            Pay Through Voucher</button>
                    </div>
                    {showVoucher &&
                        <form className={styles.voucherForm} onSubmit={submitHandler}>
                            <input
                                type='text'
                                name='voucher'
                                placeholder='Enter Voucher Code'
                                onChange={(e) => setVoucher(e.target.value)}
                                autoComplete='off'
                            />
                            <div className={styles.btnContainer}>
                                <button type='submit' disabled={submitDisable}>Apply voucher</button>
                            </div>
                        </form>}
                </div>
                {/* {planModal &&
                    <form onSubmit={handleUpgradePlan}>
                        <div className={styles.plan__grid__header}>
                            <div className={styles.plan__grid__content}>
                                <label onClick={() => setUser(prev => ({ ...prev, planPrice: '200' }))}>
                                    <input type='radio' name='selectedPlan' value='planOne' onChange={handleChange} />
                                    <span className={user.selectedPlan === 'planOne' ? styles.active : ''}>Pack 1</span>
                                </label>
                                <label onClick={() => setUser(prev => ({ ...prev, planPrice: '300' }))}>
                                    <input type='radio' name='selectedPlan' value='planTwo' onChange={handleChange} />
                                    <span className={user.selectedPlan === 'planTwo' ? styles.active : ''}>Pack 2</span>
                                </label>
                                <label onClick={() => setUser(prev => ({ ...prev, planPrice: '400' }))}>
                                    <input type='radio' name='selectedPlan' value='planThree' onChange={handleChange} />
                                    <span className={user.selectedPlan === 'planThree' ? styles.active : ''}>Pack 3</span>
                                </label>
                            </div>

                            <table className={styles.plan__grid__talbe}>
                                <tbody>
                                    <tr>
                                        <td>Monthly Price</td>
                                        <td className={user.selectedPlan === 'planOne' ? styles.active : ''}>Rs200</td>
                                        <td className={user.selectedPlan === 'planTwo' ? styles.active : ''}>Rs300</td>
                                        <td className={user.selectedPlan === 'planThree' ? styles.active : ''}>Rs400</td>
                                    </tr>
                                    <tr>
                                        <td>Video Quality</td>
                                        <td className={user.selectedPlan === 'planOne' ? styles.active : ''}>Good</td>
                                        <td className={user.selectedPlan === 'planTwo' ? styles.active : ''}>Better</td>
                                        <td className={user.selectedPlan === 'planThree' ? styles.active : ''}>Best</td>
                                    </tr>
                                    <tr>
                                        <td>Features</td>
                                        <td className={user.selectedPlan === 'planOne' ? styles.active : ''}>HD movies</td>
                                        <td className={user.selectedPlan === 'planTwo' ? styles.active : ''}>HD plus Movies</td>
                                        <td className={user.selectedPlan === 'planThree' ? styles.active : ''}>HD plus Movies + Orignials</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className={styles.btnContainer}>
                                <button type='submit' disabled={submitDisable}>Upgrade Plan</button>
                            </div>
                        </div>
                    </form>
                } */}

            </div>
        </>
    )
}

export default NoAccessCard