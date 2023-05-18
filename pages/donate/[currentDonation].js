import axios from 'axios'
import cookie from 'js-cookie';
import { useRouter } from 'next/router'
import { parseCookies } from 'nookies'
import React, { useEffect, useState } from 'react';
import Donation from '../../components/donation/Donation'
import Footer from '../../components/footer/Footer'
import Header from '../../components/header/Header'
import baseUrl from '../../utils/baseUrl'
const payfastURlForTokken = 'https://ipg1.apps.net.pk/Ecommerce/api/Transaction/GetAccessToken';
const MERCHANT_ID = 14392;
const SECURED_KEY = 'sS7ulxd4pGwExxo5g9XMwc';


const CurrentDonation = ({ ACCESS_TOKEN, user }) => {
  const router = useRouter();
  const { currentDonation } = router.query;
  const [donationData, setDonationData] = useState({});
  const getDonation = async () => {
    const res = await axios.get(`${baseUrl}/funding/${currentDonation}`, { headers: { Authorization: cookie.get('token') } });
    const { donation } = res.data;
    setDonationData({ ...donation });
  }
  useEffect(() => {
    getDonation();
  }, [])

  return (
    <>
      <Donation donation={donationData} ACCESS_TOKEN={ACCESS_TOKEN} user={user} />
    </>
  )
}

export const getServerSideProps = async (ctx) => {
  try {
    const res = await axios.post(payfastURlForTokken, null, {
      params: {
        MERCHANT_ID,
        SECURED_KEY
      }
    });
    const { ACCESS_TOKEN } = res.data;
    return { props: { ACCESS_TOKEN } };
  } catch (error) {
    return { props: { errorLoading: true } };
  }
};


export default CurrentDonation