import React, { useState, useEffect } from 'react'
import { parseCookies } from 'nookies';
import axios from 'axios';
import baseUrl from '../../utils/baseUrl';
import GiveawayComp from '../../components/giveawayComp/GiveawayComp';
import { ErrorToastr, SuccessToaster } from '../../components/layout/Toastr';
import { useRouter } from 'next/router';
import Head from 'next/head';

const Giveaway = ({ giveawayData, user }) => {
  const router = useRouter();
  const [giveaway,setGiveaway] = useState(giveawayData);
  const [showToaster, setShowToaster] = useState(false);
  const [error, setError] = useState(null);

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

  if (giveaway.length === 0) {
    return (
      <div className='container mtmb-10'>
        <div className='section mb-3'>
          <h1>No Giveaways Available Right Now...</h1>
        </div>
      </div>
    )
  }
  return (
    <>
      <Head>
        <title>Playeon - Giveaways</title>
        <meta name="description" content="We provide giveaway section at Playeon so that user can apply for giveaways and win exciting prices and vouchers. Playeon offers wide range of giveaways apply whenever you found one at playeon." />
      </Head>
      {showToaster && <SuccessToaster successMsg="Successfully Applied for Giveaway" />}
      {error && <ErrorToastr error={error} />}
      <div className='container mtmb-10'>
        <div className='section mb-3'>
          <h1>Apply In Giveaways..</h1>
          <div className='giveaway__grid'>
            {
              giveaway.map((giveaway) => (
                <GiveawayComp giveaway={giveaway} setError={setError} setShowToaster={setShowToaster} router={router} user={user} />
              ))
            }
          </div>
        </div>
      </div>
    </>
  )
}

export const getServerSideProps = async ctx => {
  try {
    const { token } = parseCookies(ctx);
    const res = await axios.get(`${baseUrl}/giveaway/all`, { headers: { Authorization: token } });
    return { props: { giveawayData: res.data } };
  } catch (error) {
    return { props: { errorLoading: true } };
  }
};
export default Giveaway