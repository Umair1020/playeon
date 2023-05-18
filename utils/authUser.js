import axios from "axios";
import baseUrl from "./baseUrl";
import Router from "next/router";
import cookie from "js-cookie";
import catchErrors from "./catchErrors";



export const registerUser = async (user, setError, setFormLoading) => {
    setFormLoading(true);
    try {
        const res = await axios.post(`${baseUrl}/signup`, { user });
        setToken(res.data);
    } catch (error) {
        const errorMsg = catchErrors(error);
        setError(errorMsg);
    }
    setFormLoading(false);
}


export const registerUserWithTrail = async (user, setError, setFormLoading) => {
    setFormLoading(true);
    try {
        const res = await axios.post(`${baseUrl}/signup/trial`, { user });
        setToken(res.data);
    } catch (error) {
        const errorMsg = catchErrors(error);
        setError(errorMsg);
    }
    setFormLoading(false);
}


export const registerUserWithPayfast = async (user, payFastResponse, setError, setFormLoading) => {
    setFormLoading(true);
    try {
        const res = await axios.post(`${baseUrl}/signup/payfast`, { user, payFastResponse });
        setToken(res.data);
    } catch (error) {
        const errorMsg = catchErrors(error);
        setError(errorMsg);
    }
    setFormLoading(false);
}
export const checkUserDetails = async (user, router, setFormLoading, setErrorMsg) => {
    setFormLoading(true);
    try {
        const res = await axios.post(`${baseUrl}/signup/checksignupdetails`, { user });
        if (res.data === 'Available') {
            router.push('/signup/planform');
        }
    } catch (error) {
        const errorMsg = catchErrors(error);
        setErrorMsg(errorMsg);
    }
    setFormLoading(false);
}

export const loginUser = async (user, setError, setFormLoading) => {
    setFormLoading(true);
    try {
        const res = await axios.post(`${baseUrl}/auth`, { user });
        setToken(res.data);
    } catch (error) {
        const errorMsg = catchErrors(error);
        setError(errorMsg);
    }
    setFormLoading(false);
}

export const redirectUser = (ctx, location) => {
    if (ctx.req) {
        ctx.res.writeHead(302, { Location: location })
        ctx.res.end();
    } else {
        Router.push(location);
    }
}

const setToken = (token) => {
    cookie.set('token', token);
    Router.push('/home');
}

export const logoutUser = async (email, _id) => {
    try {
        await axios.post(`${baseUrl}/auth/logout`, { _id })
        cookie.set('userEmail', email);
        cookie.remove('token');
        Router.push('/');
        Router.reload();
    } catch (error) {
        console.log(error);
    }
}