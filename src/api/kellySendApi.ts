import axios, { AxiosRequestHeaders, InternalAxiosRequestConfig } from 'axios';

export const kellySendApi = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

kellySendApi.interceptors.request.use(
    (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
        const headers: AxiosRequestHeaders = Object.assign({}, config.headers, {
            ...config.headers,
            Authorization: `Bearer ${localStorage.getItem('token')}`
        });
        config.headers = headers;
        return config;
    }
);
