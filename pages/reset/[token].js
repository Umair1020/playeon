import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import catchErrors from '../../utils/catchErrors';
import Loading from '../../components/loading-spinner/Loading';
import axios from 'axios';
import { ErrorToastr } from '../../components/layout/Toastr';
import styles from '../../components/login/login.module.scss';
import Link from 'next/link';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faEye, faEyeSlash, faGears } from "@fortawesome/free-solid-svg-icons";
import baseUrl from '../../utils/baseUrl';

const Token = () => {
    const router = useRouter();
    const { token } = router.query;
    const [newPassword, setNewPassword] = useState({ field1: "", field2: "" });
    const { field1, field2 } = newPassword;

    const [formLoading, setFormLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);


    useEffect(() => {
        errorMsg && setTimeout(() => {
            setErrorMsg(null);
        }, 3000);
    }, [errorMsg])



    const handleSubmit = async (e) => {
        e.preventDefault();
        if (field1 !== field2) {
            return setErrorMsg('Password do not match!');
        }
        setFormLoading(true);
        try {
            await axios.post(`${baseUrl}/reset/token`, { password: field1, token });
            setSuccess(true);
        } catch (err) {
            const error = catchErrors(err);
            setErrorMsg(error);
        }
        setFormLoading(false)
    }
    const handleChange = e => {
        const { name, value } = e.target;
        setNewPassword(prev => ({ ...prev, [name]: value }));
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
                        {success ?
                            (<p
                                onClick={() => router.push('/login')}
                                style={{ 
                                    backgroundColor: 'blue', cursor: 'pointer', 
                                    padding: '25px',
                                    display:'flex',
                                    justifyContent:'center',
                                    textAlign:'center' 
                                    }}>
                                Password changed successfully! Login now
                                <FontAwesomeIcon icon={faCheck} style={{ marginRight: '5px', marginLeft: '5px', 
                                    fontWeight: 'bold',
                                    fontSize:'2rem' }} /></p>
                                ) :
                            (<h3><FontAwesomeIcon icon={faGears} style={{ marginRight: '5px' }} />
                                Reset Password</h3>)}
                    </div>
                    {!success &&
                        (
                            <div className={styles.modal__body}>
                                {formLoading && <Loading />}
                                <form onSubmit={handleSubmit}>
                                    <div className={styles.form__control}>
                                        <input name='field1'
                                            placeholder='Enter new password'
                                            type={showPassword ? 'text' : 'password'}
                                            value={field1}
                                            onChange={handleChange}
                                            autoComplete='off'
                                        />
                                        <div className={styles.customDivIcon}>
                                            {field1.length > 0 &&
                                                <FontAwesomeIcon
                                                    icon={showPassword ? faEye : faEyeSlash}
                                                    style={{ cursor: 'pointer' }}
                                                    onClick={() => setShowPassword(!showPassword)} />
                                            }
                                        </div>
                                    </div>
                                    <div className={styles.form__control}>
                                        <input name='field2'
                                            placeholder='Confirm new password'
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            value={field2}
                                            onChange={handleChange}
                                            autoComplete='off'
                                        />
                                        <div className={styles.customDivIcon}>
                                            {field2.length > 0 &&
                                                <FontAwesomeIcon
                                                    icon={showConfirmPassword ? faEye : faEyeSlash}
                                                    style={{ cursor: 'pointer' }}
                                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)} />
                                            }
                                        </div>
                                    </div>
                                    <button
                                        type='submit'
                                        disabled={field1 === "" || field2 === "" || formLoading}
                                        className={styles.btn}>
                                        Reset
                                    </button>
                                </form>
                            </div>
                        )}
                </div>

            </div>
        </>
    )
}

export default Token