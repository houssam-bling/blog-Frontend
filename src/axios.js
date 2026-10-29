import axios from 'axios'
import {useStore} from './store'
import {toast} from 'react-hot-toast'
export const api = axios.create({
    baseURL:'http://localhost:3000',
    withCredentials:true,
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('Token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})
let refreshPromise = null;
api.interceptors.response.use(
    (response) => response,
   async (error) => {

        if (error.response?.status === 401) {

            const originalRequest = error.config;
            if (!originalRequest._retry)
            {
                originalRequest._retry = true;
                if(!refreshPromise)
                {
                    refreshPromise = axios.get(`${api.defaults.baseURL}/auth/refresh`,{
                        withCredentials:true,
                    }).finally(()=>{
                        refreshPromise = null;
                    });
                }
                try
                {
                    const response = await refreshPromise;
                    const newToken = response.data.token;
                    localStorage.setItem('Token',newToken);
                    originalRequest.headers.Authorization = `Bearer ${newToken}`
                    return api.request(originalRequest)
                }
                catch(refreshError)
                {
                    localStorage.removeItem('Token');
                    useStore.getState().logout();
                    return Promise.reject(refreshError);
                }
            }
        }
        if(error.response?.status === 429)
        {
            toast.error('طلبات كثيرة جداً، جرب من بعد شوية');
            return Promise.reject(error);
        }
        return Promise.reject(error);
    }
);