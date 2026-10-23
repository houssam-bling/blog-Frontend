import axios from 'axios'
import {useStore} from './store'
export const api = axios.create({
    baseURL:'http://localhost:3000/',
    withCredentials:true,
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('Token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})


let isRefreshing = false;
let failedQueue = [];


const processQueue = (error,token = null)=>
{
    failedQueue.forEach((prom)=>{
        if(error) 
        {
            prom.reject(error)
        }
        else
        {
            prom.resolve(token)
        }
    });

    failedQueue = [];
}

api.interceptors.response.use(
    (response) => response,
   async (error) => {
        if (error.response?.status === 401) {
            const originalRequest = error.config;

            if(isRefreshing)
            {
                return new Promise((resolve,reject)=>{
                    failedQueue.push({resolve,reject})
                }).then(token => {
                    originalRequest.headers.Authorization = `Bearer ${token}`;
                    return api.request(originalRequest);
                })
                .catch(err => Promise.reject(err));

                
            }
            if(!originalRequest?.retry)
            {
                originalRequest.retry = true;
                isRefreshing = true;

                try
                {
                    const response = await axios.get(`${api.defaults.baseURL}/auth/refresh`,{
                        withCredentials:true,
                    });
                    const newToken = response.data.Token;
                    processQueue(null, newToken);
                    localStorage.setItem('Token',newToken);
                    originalRequest.headers.Authorization = `Bearer ${newToken}`
                    return api.request(originalRequest)
                }
                catch(refreshError)
                {
                    processQueue(refreshError, null); 

                    localStorage.removeItem('Token');
                    useStore.getState().logout();
                    window.location.href = '/signIn';
                    return Promise.reject(refreshError);

                }
                finally
                {
                    isRefreshing = false;
                }
            }
            originalRequest.retry = false;
            return Promise.reject(error);
        }
        if(error.response?.status === 429)
        {
            alert('too many requests');
            return Promise.reject(error);
        }
        return Promise.reject(error);
    }
);