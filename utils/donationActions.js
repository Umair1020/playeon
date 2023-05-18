import axios from "axios";
import baseUrl from "./baseUrl";
import cookie from "js-cookie";
import catchErrors from '../utils/catchErrors';



const Axios = axios.create({
    baseURL: `${baseUrl}/donation`,
    headers: { Authorization: cookie.get('token') }
});

export const submitFeedback = async (message, setShowToster, router, setError) => {
    try {
        await Axios.post(`/`, { message });
        setShowToster(true);
        router.reload();
    } catch (error) {
        const errorMsg = catchErrors(error);
        setError(errorMsg);
    }
}