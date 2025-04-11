import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@/models/user';
import { RootState } from '@/redux/store';
const initialState: { user: User | null, accessToken: String | null, refreshToken: String | null } = {
    user: null,
    accessToken: null,
    refreshToken: null,
};
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setMe(state, action: PayloadAction<User>) {
            state.user = action.payload;
            console.log('setMe thành công', action.payload);
        },
        clearUser(state) {
            state.user = null;
            console.log('clearUser thành công', state.user);
        },
        setAccessToken(state, action: PayloadAction<string>) {
            state.accessToken = action.payload;
            console.log('setAccessToken thành công', action.payload);
        },
        setRefreshToken(state, action: PayloadAction<string>) {
            state.refreshToken = action.payload;
            console.log('setRefreshToken thành công', action.payload);
        },
        clearTokens(state) {
            state.accessToken = null;
            state.refreshToken = null;
            console.log('clearTokens thành công', state.accessToken, state.refreshToken);
        }
    },
});

export const { setMe, clearUser, setAccessToken, setRefreshToken, clearTokens } = userSlice.actions;



export const selectAccessToken = (state: RootState) => state.user.accessToken;


export default userSlice.reducer;
