import { useEffect, useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faWarning } from '@fortawesome/free-solid-svg-icons';
import { renewCardAccount } from '../../utils/renewCardAccount';
import Loading from '../loading-spinner/Loading';
import { ErrorToastr } from '../layout/Toastr';



const SuccessfulPayment = ({ user, payFastResponse, router }) => {
    const [formLoading, setFormLoading] = useState(false);
    const [error, setError] = useState(null);
    const buttonRef = useRef(null);
    const handleSubmit = async (event) => {
        event.preventDefault();
        await renewCardAccount(user, payFastResponse, setError, setFormLoading, router);
    }


    return (
        <>
            {formLoading && <Loading />}
            {error && <ErrorToastr error={error} />}
            <div className='successModal'>
                <div className='successContainer'>
                    <div className='successIcon'>
                        <FontAwesomeIcon icon={faCheckCircle} style={{ marginRight: '10px' }} />
                        <p>Successful Transaction</p>
                    </div>
                    <form onSubmit={handleSubmit} className='successForm'>
                        <button type='submit'>Proceed</button>
                    </form>
                </div>
            </div>
        </>)
}

export default SuccessfulPayment