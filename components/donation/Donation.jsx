import React, { useEffect, useState } from 'react';
import styles from './donation.module.scss';


const Donation = ({ donation, ACCESS_TOKEN, user }) => {
  const { email, phoneNumber } = user;
  const [submitDisable, setSubmitDisable] = useState(true);
  const [ammount, setAmmount] = useState(0);


  useEffect(() => {
    ammount >= 500 ? setSubmitDisable(false) : setSubmitDisable(true);
  }, [ammount])
  const today = new Date();
  const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  return (
    <>
      <div className={styles.title}>
        <h1>{donation.title}</h1>
      </div>
      <div className={styles.main__donation}>
        <div className={styles.left}>
          <div className={styles.left__img}>
            <img src={donation.img} alt={donation.title} />
          </div>
          <div className={styles.left__content}>
            <h4>Summary</h4>
            <p>{donation.description}</p>
          </div>
        </div>
        <form className={styles.right} method='POST' action='https://ipg1.apps.net.pk/Ecommerce/api/Transaction/PostTransaction'>
          <div className={styles.righ__content}>
            <span className={styles.current__donation}>Total Rs.{donation.ammount}</span>
            <div className={styles.loadingbar}></div>
            <div className={styles.donation__details}>
              <div className={styles.donation__right}>
                <span>
                  <input type='text' placeholder='Enter ammount atleast 500' name='ammount' onChange={e => setAmmount(e.target.value)} autoComplete='off' />
                  <input hidden type='text' name='MERCHANT_ID' value='14392' readOnly />
                  <input hidden type='text' name='MERCHANT_NAME' value='Playeon' readOnly />
                  <input hidden type='text' name='TOKEN' value={ACCESS_TOKEN} readOnly />
                  <input hidden type='text' name='PROCCODE' value='00' readOnly />
                  <input hidden type='text' name='TXNAMT' value={ammount} readOnly />
                  <input hidden type='text' name='CUSTOMER_MOBILE_NO' value={phoneNumber} readOnly />
                  <input hidden type='text' name='CUSTOMER_EMAIL_ADDRESS' value={email} readOnly />
                  <input hidden type='text' name='SIGNATURE' value='playeonDonation' readOnly />
                  <input hidden type='text' name='VERSION' value='v1' readOnly />
                  <input hidden type='text' name='TXNDESC' value={donation.title} readOnly />
                  <input hidden type='text' name='SUCCESS_URL' value="https://www.playeon.com/home" readOnly />
                  <input hidden type='text' name='FAILURE_URL' value='https://www.playeon.com/home' readOnly />
                  <input hidden type='text' name='BASKET_ID' value='101' readOnly />
                  <input hidden type='text' name='ORDER_DATE' value={date} readOnly />
                  <input hidden type='text' name='CHECKOUT_URL' value='https://apiv1.playeon.com/api/v1/signup/payment/confirmation' readOnly />
                </span>
              </div>
            </div>
            <div className={styles.triangle}></div>
          </div>
          <button type='submit' className={styles.button} disabled={submitDisable}>
            DONATE NOW
          </button>
        </form>
      </div>
    </>
  )
}

export default Donation