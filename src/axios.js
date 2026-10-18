import axios from 'axios'
import {useStore} from './store'
export const api = axios.create({
    baseURL:'https://blog-backend-production-3557.up.railway.app'
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('Token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            useStore.getState().logout();
        }
        return Promise.reject(error);
    }
);