import React from 'react';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import LandingDonation from '../../components/donation/LandingDonation';
import baseUrl from '../../utils/baseUrl';
import { parseCookies } from 'nookies';
import axios from 'axios';
import Head from 'next/head';


const DonationPage = ({ donations }) => {
  return (
    <>
      <Head>
        <title>Playeon - Donate</title>
        <meta name="description" content="Playeon donation where you can donate to communities,groups or individuals and help them acheive there needs. No one has ever become poor from givining." />
      </Head>
      <LandingDonation donations={donations} />



    </>

  );
};


export const getServerSideProps = async ctx => {
  try {
    const { token } = parseCookies(ctx);
    const res = await axios.get(`${baseUrl}/funding`, { headers: { Authorization: token } });
    const { donations } = res.data;
    return { props: { donations } };
  } catch (error) {
    return { props: { errorLoading: true } };
  }
};



export default DonationPage;
