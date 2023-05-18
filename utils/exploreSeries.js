import axios from "axios";
import baseUrl from "./baseUrl";
import cookie from "js-cookie";
import catchErrors from '../utils/catchErrors';






const Axios = axios.create({
    baseURL: `${baseUrl}/exploreSeries`,
    headers: { Authorization: cookie.get('token') }
});

export const likeSeriesShort = async (seriesId, userId, setLikes, like = true) => {
    try {
        if (like) {
            await Axios.post(`/like/${seriesId}`);
            setLikes(prev => [...prev, { user: userId }])
        }
        else if (!like) {
            await Axios.post(`/unlike/${seriesId}`);
            setLikes(prev => prev.filter(like => like.user !== userId));
        }
    } catch (error) {
        console.log(error);
    }
}