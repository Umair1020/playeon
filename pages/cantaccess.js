import axios from 'axios';
import React, { useEffect } from 'react'
import NoAccessCard from '../components/noaccessComp/NoAccessCard';
import NoAccessVoucher from '../components/noaccessComp/NoAccessVoucher';
import { useRouter } from 'next/router';
import SuccessfulPayment from '../components/noaccessComp/SuccessfulPayment';
import FailurePayment from '../components/noaccessComp/FailurePayment';
const payfastURlForTokken = 'https://ipg1.apps.net.pk/Ecommerce/api/Transaction/GetAccessToken';
const MERCHANT_ID = 14392;
const SECURED_KEY = 'sS7ulxd4pGwExxo5g9XMwc';


  // demo SECURED_KEY = 'nj73wc7wWy8PkXQPCGZg';
  // demo CHECKOUT_URL = 'https://ipguat.apps.net.pk/Ecommerce/api/Transaction/GetAccessToken'

  // live SECURED_KEY = 'sS7ulxd4pGwExxo5g9XMwc';
  // live CHECKOUT_URL = 'https://ipg1.apps.net.pk/Ecommerce/api/Transaction/GetAccessToken';




const CantAccess = ({ user, ACCESS_TOKEN }) => {
    const router = useRouter();
    const payFastResponse = {
        err_code: router.query.err_code,
        err_msg: router.query.err_msg,
        transaction_id: router.query.transaction_id,
        Rdv_Message_Key: router.query.Rdv_Message_Key,
        Response_Key: router.query.Response_Key
    }

    const { err_code, transaction_id, Rdv_Message_Key, Response_Key } = payFastResponse;
    if (err_code && transaction_id && Rdv_Message_Key && Response_Key) {
        return err_code === '00' || err_code === '000' ? <SuccessfulPayment user={user} payFastResponse={payFastResponse} router={router} /> : <FailurePayment payFastResponse={payFastResponse} user={user} />
    }

    return (
        <>
            <NoAccessCard ACCESS_TOKEN={ACCESS_TOKEN} user={user} router={router} />
        </>
    )
}


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

export default CantAccess



