import React from 'react';
import Navbar from '../../components/landing-navbar/Navbar';
import CreditCard from '../../components/signup/credit/CreditCard';
import axios from 'axios';
const payfastURlForTokken = 'https://ipg1.apps.net.pk/Ecommerce/api/Transaction/GetAccessToken';
const MERCHANT_ID = 14392;
const SECURED_KEY = 'sS7ulxd4pGwExxo5g9XMwc';
const BASKET_ID = '101';
const creditoption = ({ ACCESS_TOKEN }) => {
  // demo SECURED_KEY = 'nj73wc7wWy8PkXQPCGZg';
  // demo CHECKOUT_URL = 'https://ipguat.apps.net.pk/Ecommerce/api/Transaction/GetAccessToken'

  // live SECURED_KEY = 'sS7ulxd4pGwExxo5g9XMwc';
  // live CHECKOUT_URL = 'https://ipg1.apps.net.pk/Ecommerce/api/Transaction/GetAccessToken';


  return (
    <>
      <Navbar />
      <CreditCard ACCESS_TOKEN={ACCESS_TOKEN} />
    </>
  );
};

export const getServerSideProps = async ctx => {
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

export default creditoption;
