import axios from "axios";
import baseUrl from "./baseUrl";
import cookie from "js-cookie";
import catchErrors from '../utils/catchErrors';






const Axios = axios.create({
    baseURL: `${baseUrl}/exploreMovie`,
    headers: { Authorization: cookie.get('token') }
});

export const likeMovieShort = async (movieId, userId, setLikes, like = true) => {
    try {
        if (like) {
            await Axios.post(`/like/${movieId}`);
            setLikes(prev => [...prev, { user: userId }])
        }
        else if (!like) {
            await Axios.post(`/unlike/${movieId}`);
            setLikes(prev => prev.filter(like => like.user !== userId));
        }
    } catch (error) {
        console.log(error);
    }
}