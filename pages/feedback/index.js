import React, { useState, useEffect } from 'react'
import { ErrorToastr, SuccessToaster } from '../../components/layout/Toastr';
import { submitFeedback } from '../../utils/feedbackActions';
import { useRouter } from 'next/router';
import Head from 'next/head';

const Feedback = () => {
  const router = useRouter();
  const [feedback, setFeedback] = useState('');
  const [showToaster, setShowToaster] = useState(false);
  const [error, setError] = useState(null);
  const [submitDisable, setSubmitDisable] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await submitFeedback(feedback, setShowToaster, router, setError);
  }
  useEffect(() => {
    const isMessage = Object.values({ feedback }).every(item => Boolean(item));
    isMessage ? setSubmitDisable(false) : setSubmitDisable(true);
  }, [feedback]);
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
        <title>Playeon - Feedback</title>
        <meta name="description" content="Give us your feedback as we really consider our users feedback cheers!" />
      </Head>
      <div className='container mtmb-10'>
        {showToaster && <SuccessToaster successMsg="Thanks for giving us feedback!" />}
        {error && <ErrorToastr error={error} />}
        <div className='section'>
          <h1>Give us your Feedback!</h1>
          <div className='messagesForm'>
            <form onSubmit={handleSubmit}>
              <textarea placeholder='Feedback' name='message' cols={10} rows={10} onChange={(e) => setFeedback(e.target.value)}></textarea>
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

export default Feedback