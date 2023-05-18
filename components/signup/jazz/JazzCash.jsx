import Link from 'next/link';
import React from 'react';
import styles from './jazz.module.scss';
const JazzCash = () => {
    return (
        <>
            <div className={styles.center__container}>
                <div className={styles.main__content}>
                    <form>

                        <div className={styles.payment__container}>
                            <div>
                                <div className={styles.header}>
                                    <span>STEP <b>3</b> OF <b>3</b></span>
                                    <h1>Set up billing through Jazz Cash</h1>
                                </div>
                            </div>
                            <div className={styles.field__container}>
                                <div>
                                    <span><img src='https://www.jazzcash.com.pk/assets/themes/jazzcash/img/mobilink_logo.png' /></span>
                                </div>
                                <div>
                                    <p>Your Flimstre membership will be added to your mobile phone bill.</p>
                                    <p><strong>We’ll text a code to verify your number for payment.</strong> Your phone number will also be used if you forget your password and for important account messages.</p>
                                </div>

                                <ul>
                                    <li>
                                        <div className={styles.country}>
                                            <div className={styles.country__input}>
                                                <div>
                                                    <div>
                                                        <span>+92</span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className={styles.inputt}>
                                                        <label>
                                                            <input type='tel' placeholder='Mobile Number' />
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>

                                <ul>
                                    <li>
                                        <div class="signupTerms">
                                            <span id="">By checking the checkbox below, you agree to our <a target="_blank">Terms of Use</a>, <a target="_blank">Privacy Statement</a>, and that you are over 18. Flimstree will automatically continue your membership and charge the membership fee (currently Rs1,100/month) to your payment method until you cancel. You may cancel at any time to avoid future charges.</span>
                                            <div class="ui-binary-input"><input type="checkbox" />
                                                <label><span>I agree.</span></label>
                                            </div>
                                        </div>
                                    </li>
                                </ul>

                            </div>
                        </div>
                        <div className={styles.btn__container}>
                            <Link href='/home'><button className=''>Procced</button></Link>
                        </div>


                    </form>
                </div>
            </div>
        </>
    );
};

export default JazzCash;
