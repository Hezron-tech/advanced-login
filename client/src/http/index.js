import axios from 'axios';

export const API_URL = 'http://localhost:7000/api'

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
});

axios.defaults.withCredentials = true;
$api.interceptors.request.use(config => {
    if (localStorage.getItem('token')) {
        config.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('token'))}`;
    }

    return config
});

export default $api;