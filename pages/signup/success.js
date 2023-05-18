import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState, useEffect, useContext, useRef } from 'react';
import Navbar from '../../components/landing-navbar/Navbar';
import { UserContext } from '../../utils/context/userContext';
import Loading from '../../components/loading-spinner/Loading';
import { registerUserWithPayfast } from '../../utils/authUser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fa1, faCheck, faCheckCircle, faFontAwesome, faRibbon, faWarning } from '@fortawesome/free-solid-svg-icons';

const Success = () => {
  const router = useRouter();
  const buttonRef = useRef(null);
  const userDetails = useContext(UserContext);
  const [user, setUser] = userDetails;
  const [error, setError] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const payFastResponse = {
    err_code: router.query.err_code,
    transaction_id: router.query.transaction_id
  }
  const { err_code, transaction_id } = payFastResponse;
  const { name, email, password, country, phoneNumber, plan, paymentMethod } = user;
  const handleSubmit = async (event) => {
    event.preventDefault();
    await registerUserWithPayfast(user, payFastResponse, setError, setFormLoading);
  }

  return (
    <>
      {user && err_code === '00' || err_code === '000' ? <>
      <Navbar />
        <div
          className='successContainer'>
          <div className='successIcon'>
            <FontAwesomeIcon icon={faCheckCircle} style={{ marginRight: '10px' }} />
            <p>Successful Transaction</p>
          </div>
          <form onSubmit={handleSubmit} className='successForm'>
            <button type='submit'>Proceed</button>
          </form>
        </div>
        {formLoading && <Loading />}
      </> : <>
        <Navbar />
        <div style={
          {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'crimson',
            marginTop: '10%'
          }
        }>
          <Link href={'/'}>
            <h1 style={{ cursor: 'pointer' }}>Fill out the form first and make payment.</h1>
          </Link>
        </div>
      </>
      }
    </>
  )
}

export default Success