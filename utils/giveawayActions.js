import axios from "axios";
import baseUrl from "./baseUrl";
import cookie from "js-cookie";
import catchErrors from '../utils/catchErrors';


const Axios = axios.create({
    baseURL: `${baseUrl}/giveaway`,
    headers: { Authorization: cookie.get('token') }
});


export const ApplyForGiveAway = async (id, setShowToster, setError, router) => {
    try {
        await Axios.post(`/${id}`);
        setShowToster(true);
        router.reload();
    } catch (error) {
        const errorMsg = catchErrors(error);
        setError(errorMsg);
    }
}