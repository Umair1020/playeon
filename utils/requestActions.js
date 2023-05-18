import axios from "axios";
import baseUrl from "./baseUrl";
import cookie from "js-cookie";
import catchErrors from '../utils/catchErrors';



const Axios = axios.create({
    baseURL: `${baseUrl}/request`,
    headers: { Authorization: cookie.get('token') }
});

export const submitRequest = async (message, setShowToster, router, setError) => {
    try {
        await Axios.post(`/`, { message });
        setShowToster(true);
        setTimeout(() => {
            router.push('/home');
        }, 2000);
    } catch (error) {
        const errorMsg = catchErrors(error);
        setError(errorMsg);
    }
}