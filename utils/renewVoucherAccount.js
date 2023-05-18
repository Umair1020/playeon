import axios from "axios";
import baseUrl from "./baseUrl";
import cookie from "js-cookie";
import catchErrors from '../utils/catchErrors';



const Axios = axios.create({
    baseURL: `${baseUrl}/auth/renew/voucher`,
    headers: { Authorization: cookie.get('token') }
});

export const renewVoucherAccount = async (user, voucher, setError, setFormLoading, router) => {
    setFormLoading(true);
    try {
        await Axios.post('/', { user, voucher });
        router.reload();
    } catch (error) {
        const errorMsg = catchErrors(error);
        setError(errorMsg);
    }
    setFormLoading(false);
}