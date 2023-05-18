import axios from "axios";
import baseUrl from "./baseUrl";
import cookie from "js-cookie";




const Axios = axios.create({
    baseURL: `${baseUrl}/series`,
    headers: { Authorization: cookie.get('token') }
});

export const likeSeries = async (seriesId, userId, setLikes, like = true) => {
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