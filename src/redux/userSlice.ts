import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@/models/user';
import { RootState } from '@/redux/store';
const initialState: { user: User | null, accessToken: String | null, refreshToken: String | null, sendFriends: any, receiveFriends: any, friends: any } = {
    user: null,
    accessToken: null,
    refreshToken: null,
    sendFriends: [],
    receiveFriends: [],
    friends: [],
};
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setMe(state, action: PayloadAction<User>) {
            state.user = action.payload;
            console.log('setMe thành công', action.payload);
        },
        setFcmToken(state, action: PayloadAction<string>) {
            if (state.user) {
                state.user.fcmToken = action.payload;
            }
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
        },
        setFriends: (state: any, { payload }: PayloadAction<any>) => {
            state.friends = payload;
        },
        setSendFriends: (state: any, { payload }: PayloadAction<any>) => {
            state.sendFriends = payload;
        },
        setReceiveFriends: (state: any, { payload }: PayloadAction<any>) => {
            state.receiveFriends = payload;
        },

    },
});

export const { setMe, setFcmToken, clearUser, setAccessToken, setRefreshToken, clearTokens, setReceiveFriends, setFriends, setSendFriends } = userSlice.actions;



export const selectAccessToken = (state: RootState) => state.user.accessToken;


export default userSlice.reducer;
