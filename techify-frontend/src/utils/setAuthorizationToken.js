import axiosInstance from '../utils/axiosInstance';

import {
    omit
} from 'lodash';

export default function setAuthorizationToken(token) {

    if (token) {

        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    } else {

        axiosInstance.defaults.headers.common = omit(axiosInstance.defaults.headers.common, ['Authorization']);

    }

}