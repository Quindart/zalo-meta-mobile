// // import axios, { AxiosInstance } from 'axios';
// // // import { getAccessToken } from '@/utils/tokenManager';
// // import { Alert } from 'react-native';
// // import { selectAccessToken } from '@/redux/userSlice';


// // const API_URL = process.env.EXPO_PUBLIC_API_URL;

// // const axiosConfig: AxiosInstance = axios.create({
// //     baseURL: API_URL,
// //     headers: {
// //         'Content-Type': 'application/json',
// //     },
// //     timeout: 10000,
// // });

// // axiosConfig.interceptors.request.use(
// //     async (config) => {
// //         const accessToken = selectAccessToken;
// //         if (accessToken) {
// //             config.headers.Authorization = `Bearer ${accessToken}`;
// //         }
// //         return config;
// //     },
// //     (error) => {
// //         return Promise.reject(error);
// //     },
// // );


// // axiosConfig.interceptors.response.use(
// //     (response) => {
// //         if (response.data && response.data.success) {
// //             return response.data;
// //         }
// //         Alert.alert('Lỗi', response.data?.message || 'Có lỗi xảy ra');
// //         throw new Error(response.data?.message || 'Request failed');
// //     },
// // );

// // export default axiosConfig;



// import axios, { AxiosInstance } from 'axios';
// import { Alert } from 'react-native';
// import store from '@/redux/store'; // Import store để truy cập Redux state

// const API_URL = process.env.EXPO_PUBLIC_API_URL;

// const axiosConfig: AxiosInstance = axios.create({
//     baseURL: API_URL,
//     headers: {
//         'Content-Type': 'application/json',

//     },
//     timeout: 30000,
// });

// axiosConfig.interceptors.request.use(
//     async (config) => {
//         const state = store.getState(); // Lấy toàn bộ state từ Redux Store
//         const accessToken = state.user.accessToken; // Lấy accessToken từ state
//         if (accessToken) {
//             config.headers.Authorization = `Bearer ${accessToken}`;
//         }
//         console.log('Request config:', config);
//         return config;
//     },
//     (error) => {
//         console.error('Request Interceptor Error:', error);
//         return Promise.reject(error);
//     },
// );



// axiosConfig.interceptors.response.use(
//     (response) => {
//         if (response.data && response.data.success) {
//             return response.data;
//         }
//         Alert.alert('Lỗi', response.data?.message || 'Có lỗi xảy ra');
//         throw new Error(response.data?.message || 'Request failed');
//     },
//     (error) => {
//         console.error('Request Interceptor Error:', error);
//         return Promise.reject(error);
//     },
// );

// export default axiosConfig;

import axios, { AxiosInstance } from 'axios';
import { Alert } from 'react-native';
import store from '@/redux/store'; // Import Redux store

const API_URL = process.env.EXPO_PUBLIC_API_URL;

const axiosConfig: AxiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 45000, // Tăng timeout lên 30 giây
});

axiosConfig.interceptors.request.use(
    async (config) => {
        try {
            const state = store.getState();
            const accessToken = state.user.accessToken;
            if (accessToken) {
                config.headers.Authorization = `Bearer ${accessToken}`;
            }
            console.log('Request config:', config);
            return config;
        } catch (error) {
            // console.error('Request Interceptor Error:', error);
            return Promise.reject(error);
        }
    },
    (error) => {
        // console.error('Request Interceptor Error:', error);
        return Promise.reject(error);
    },
);

axiosConfig.interceptors.response.use(
    (response) => {
        if (response.data && response.data.success) {
            return response.data;
        }
        Alert.alert('Lỗi', response.data?.message || 'Có lỗi xảy ra');
        throw new Error(response.data?.message || 'Request failed');
    },
    (error) => {
        // console.error('Response Interceptor Error:', error.message);
        Alert.alert('Lỗi', 'Không thể kết nối tới máy chủ.');
        return Promise.reject(error);
    },
);

export default axiosConfig;