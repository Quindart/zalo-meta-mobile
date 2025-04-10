import axios, { AxiosInstance } from 'axios';
import { getAccessToken, getRefreshToken, setTokens } from '@/utils/tokenManager';
import { Alert } from 'react-native';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

const axiosConfig: AxiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
});

axiosConfig.interceptors.request.use(
    async (config) => {
        const accessToken = getAccessToken();
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

axiosConfig.interceptors.response.use(
    (response) => {
        if (response.data && response.data.success) {
            return response.data;
        }
        Alert.alert('Lỗi', response.data?.message || 'Có lỗi xảy ra');
        // throw new Error(response.data?.message || 'Request failed');
    },
    // async (error) => {
    //     const originalRequest = error.config;
    //     if (error.response?.status === 401 && !originalRequest._retry) {
    //         originalRequest._retry = true;
    //         try {
    //             const refreshToken = getRefreshToken();
    //             if (refreshToken) {
    //                 const refreshResponse = await axios.post(`${API_URL}/api/v1/auth/refresh-token`, { refreshToken });
    //                 if (refreshResponse.data.success) {
    //                     const { accessToken, refreshToken: newRefreshToken } = refreshResponse.data.data.tokens;
    //                     setTokens(accessToken, newRefreshToken);
    //                     originalRequest.headers.Authorization = `Bearer ${accessToken}`;
    //                     return axiosConfig(originalRequest);
    //                 }
    //             }
    //         } catch (refreshError) {
    //             console.error('Refresh token thất bại', refreshError);
    //             setTokens('', '');
    //         }
    //     }
    //     return Promise.reject(error);
    // },
);

export default axiosConfig;

