import { useState, useEffect } from 'react'
import { ErrorToastr } from '../layout/Toastr';
import Loading from '../loading-spinner/Loading';
import styles from './cantaccess.module.scss';
import { CapitilizeFirstLetter } from '../../utils/utilityFunctions';
import { renewVoucherAccount } from '../../utils/renewVoucherAccount';


const  NoAccessVoucher = ({ user, router }) => {
    const [voucher, setVoucher] = useState('');
    const [submitDisable, setSubmitDisable] = useState(true);
    const [error, setError] = useState(null);
    const [formLoading, setFormLoading] = useState(false);
    const [showVoucher, setShowVoucher] = useState(false);
    useEffect(() => {
        const isVoucher = Object.values({ voucher }).every(item => Boolean(item));
        isVoucher ? setSubmitDisable(false) : setSubmitDisable(true);
    }, [voucher]);
    const expiryDate = user.voucherExpiryDate.substring(0, 10);

    useEffect(() => {
        error && setTimeout(() => {
            setError(null);
        }, 3000);
    }, [error]);

    const submitHandler = async (event) => {
        event.preventDefault();
        await renewVoucherAccount(user, voucher, setError, setFormLoading, router);
    }
    return (
        <>
            {formLoading && <Loading />}
            {error && <ErrorToastr error={error} />}
            <div className={styles.voucherContainer}>
                <div className={styles.userDetails}>
                    <div className={styles.voucherLeft}>
                        <h1>Hello <span className={styles.username}>{CapitilizeFirstLetter(user.name)}</span>,</h1>
                        <p>Your voucher is expired on <span className={styles.expiry}>{expiryDate}</span></p>
                    </div>
                    <div className={styles.voucherRight}>
                        <img src={user.profilePicture} alt={user.name} />
                    </div>
                </div>
                <div className={styles.voucherMessage}>
                    <h4>If you want to access more content apply new voucher</h4>
                    <button onClick={() => setShowVoucher(!showVoucher)}>New Voucher</button>
                </div>

                {showVoucher &&
                    <form className={styles.voucherForm} onSubmit={submitHandler}>
                        <input
                            type='text'
                            name='voucher'
                            placeholder='Enter New Voucher Code'
                            onChange={(e) => setVoucher(e.target.value)}
                            autoComplete='off'
                        />
                        <div className={styles.btnContainer}>
                            <button type='submit' disabled={submitDisable}>Apply Voucher</button>
                        </div>
                    </form>}

            </div>
        </>
    )
}

export default NoAccessVoucher