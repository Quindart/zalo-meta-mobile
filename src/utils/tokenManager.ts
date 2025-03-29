// // tokenManager.ts
// interface Tokens {
//     accessToken: string | null;
//     refreshToken: string | null;
// }

// const tokenStore: Tokens = {
//     accessToken: null,
//     refreshToken: null,
// };

// export const setTokens = (accessToken: string, refreshToken: string) => {
//     tokenStore.accessToken = accessToken;
//     tokenStore.refreshToken = refreshToken;
// };

// export const getAccessToken = () => tokenStore.accessToken;
// export const getRefreshToken = () => tokenStore.refreshToken;
// export const clearTokens = () => {
//     tokenStore.accessToken = null;
//     tokenStore.refreshToken = null;
// };

// export default tokenStore; 

// tokenManager.ts
interface Tokens {
    accessToken: string | null;
    refreshToken: string | null;
}

// Kiểm tra xem có chạy trong React Native hay không
const isReactNative = typeof window === 'undefined' || typeof localStorage === 'undefined';

const tokenStore: Tokens = {
    accessToken: null,
    refreshToken: null,
};

export const setTokens = (accessToken: string, refreshToken: string) => {
    tokenStore.accessToken = accessToken;
    tokenStore.refreshToken = refreshToken;
    if (!isReactNative) {
        // Lưu vào localStorage nếu chạy trong web
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
    }
};

export const getAccessToken = () => {
    if (!isReactNative && !tokenStore.accessToken) {
        // Lấy từ localStorage nếu trong web và chưa có trong memory
        tokenStore.accessToken = localStorage.getItem('accessToken');
    }
    return tokenStore.accessToken;
};

export const getRefreshToken = () => {
    if (!isReactNative && !tokenStore.refreshToken) {
        tokenStore.refreshToken = localStorage.getItem('refreshToken');
    }
    return tokenStore.refreshToken;
};

export const clearTokens = () => {
    tokenStore.accessToken = null;
    tokenStore.refreshToken = null;
    if (!isReactNative) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
    }
};

export default tokenStore;