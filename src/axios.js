import axios from 'axios'
import {useStore} from './store'
export const api = axios.create({
    baseURL:'https://blog-backend-production-3557.up.railway.app',
    withCredentials:true,
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
   async (error) => {
        if (error.response?.status === 401) {
            const originalRequest = error.config;
            try
            {
                const response = await axios.get('https://blog-backend-production-3557.up.railway.app/auth/refresh',{
                    withCredentials:true,
                });

                const newToken = response.data.Token;
                localStorage.setItem('Token',newToken);
                return api.request(originalRequest)
            }
            catch(refreshError)
            {
                localStorage.removeItem('Token');
                useStore.getState().logout();
                window.location.href = '/signIn';
                return Promise.reject(refreshError);

            }

        }
        return Promise.reject(error);
    }
);