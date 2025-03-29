import axios, { AxiosInstance } from 'axios';
import { getAccessToken, getRefreshToken, setTokens } from '@/utils/tokenManager';

const API_URL = 'http://192.168.178.50:5000'; // Có thể thay bằng biến môi trường

const axiosConfig: AxiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
});

// Thêm interceptor để thêm token vào header Authorization
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

// Xử lý response và lỗi
axiosConfig.interceptors.response.use(
    (response) => {
        if (response.data && response.data.success) {
            return response.data; // Trả về toàn bộ { success, message, data }
        }
        throw new Error(response.data?.message || 'Request failed');
    },
    async (error) => {
        const originalRequest = error.config;

        // Xử lý lỗi 401 (token hết hạn)
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const refreshToken = getRefreshToken();
                if (refreshToken) {
                    const refreshResponse = await axios.post(`${API_URL}/api/v1/auth/refresh-token`, { refreshToken });
                    if (refreshResponse.data.success) {
                        const { accessToken, refreshToken: newRefreshToken } = refreshResponse.data.data.tokens;
                        // Lưu token mới vào biến toàn cục
                        setTokens(accessToken, newRefreshToken);
                        // Thêm token mới vào header và thử lại request
                        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                        return axiosConfig(originalRequest);
                    }
                }
            } catch (refreshError) {
                console.error('Refresh token thất bại', refreshError);
                // Xóa token nếu refresh token thất bại
                setTokens('', '');
                // Để useAuth xử lý navigation
            }
        }
        return Promise.reject(error);
    },
);

export default axiosConfig;