import axios from "axios";
import baseUrl from "./baseUrl";
import cookie from "js-cookie";
import catchErrors from '../utils/catchErrors';



const Axios = axios.create({
    baseURL: `${baseUrl}/auth/renew/card`,
    headers: { Authorization: cookie.get('token') }
});

export const renewCardAccount = async (user, payFastResponse, setError, setFormLoading, router) => {
    setFormLoading(true);
    try {
        await Axios.post(`/`, { user, payFastResponse });
        router.reload();
    } catch (error) {
        const errorMsg = catchErrors(error);
        setError(errorMsg);
    }
    setFormLoading(false);
}