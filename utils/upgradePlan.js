import axios from "axios";
import baseUrl from "./baseUrl";
import cookie from "js-cookie";
import catchErrors from '../utils/catchErrors';



const Axios = axios.create({
    baseURL: `${baseUrl}/auth/upgradeplan`,
    headers: { Authorization: cookie.get('token') }
});

export const upgradeUserPlan = async (user, setError, setFormLoading, router, setShowToster) => {
    setFormLoading(true);
    try {
        await Axios.post('/', { user });
        setShowToster(true);
        router.reload();
    } catch (error) {
        const errorMsg = catchErrors(error);
        setError(errorMsg);
    }
    setFormLoading(false);
}