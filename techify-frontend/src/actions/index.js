import axios from '../utils/axiosInstance';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import {
    CURRENT_PAGE_DATA,
} from './types';

export const login = (payload) => async (dispatch) => {

    try {

        const res = await axios.post('/api/v1/user/login', payload);

        const token = res.data.data.token;

        localStorage.setItem('token', token);

        setAuthorizationToken(token);

        return res.data.data;

    } catch (e) {

        throw e;

    }

};

export const logout = () => async (dispatch) => {

    try {

        localStorage.removeItem('token');

        setAuthorizationToken(false);

        return true;

    } catch (e) {

        throw e;

    }

};

export const dashboardDetails = () => async (dispatch) => {

    try {

        const res = await axios.get('/api/v1/user/dashboard');

        dispatch({
            type: CURRENT_PAGE_DATA,
            payload: res.data.data,
        });

        return res.data.data;

    } catch (e) {

        throw e;

    }

};

export const register = (payload) => async (dispatch) => {

    try {

        const res = await axios.post('/api/v1/user/register', payload);

        return res.data.data;

    } catch (e) {

        throw e;

    }

};