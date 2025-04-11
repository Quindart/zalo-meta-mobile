interface Tokens {
    accessToken: string | null;
    refreshToken: string | null;
}

// lưu trữ token trong memory
const tokenStore: Tokens = {
    accessToken: null,
    refreshToken: null,
};

export const setTokens = (accessToken: string, refreshToken: string) => {
    tokenStore.accessToken = accessToken;
    tokenStore.refreshToken = refreshToken;
};

export const getAccessToken = () => {
    return tokenStore.accessToken;
};

export const getRefreshToken = () => {
    return tokenStore.refreshToken;
};

export const clearTokens = () => {
    tokenStore.accessToken = null;
    tokenStore.refreshToken = null;
};

export default tokenStore;