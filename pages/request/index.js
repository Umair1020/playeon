import React, { useState, useEffect } from 'react'
import { ErrorToastr, SuccessToaster } from '../../components/layout/Toastr';
import { useRouter } from 'next/router';
import { submitRequest } from '../../utils/requestActions';
import Head from 'next/head';
const Request = () => {
  const router = useRouter();
  const [request, setRequest] = useState('');
  const [showToaster, setShowToaster] = useState(false);
  const [error, setError] = useState(null);
  const [submitDisable, setSubmitDisable] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await submitRequest(request, setShowToaster, router, setError);
  }
  useEffect(() => {
    const isRequest = Object.values({ request }).every(item => Boolean(item));
    isRequest ? setSubmitDisable(false) : setSubmitDisable(true);
  }, [request]);
  useEffect(() => {
    error && setTimeout(() => {
      setError(null);
    }, 3000);
  }, [error])
  useEffect(() => {
    showToaster && setTimeout(() => {
      setShowToaster(false);
    }, 3000);
  }, [showToaster])
  return (
    <>

      <Head>
        <title>Playeon - Request</title>
        <meta name="description" content="Request movies or series and playeon will take care of it for you to provide you better content!" />
      </Head>
      <div className='container mtmb-10'>
        {showToaster && <SuccessToaster successMsg="We will try our best to provide you these movies shortly!" />}
        {error && <ErrorToastr error={error} />}
        <div className='section'>
          <h1>Request Movies</h1>
          <div className='messagesForm'>
            <form onSubmit={handleSubmit}>
              <textarea placeholder='Request Movies' name='message' cols={10} rows={10} onChange={(e) => setRequest(e.target.value)}></textarea>
              <div className='messageButtons'>
                <button type='submit' disabled={submitDisable}>Send</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Request