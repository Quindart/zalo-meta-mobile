// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { User } from '@/models/user';
// const initialState: { user: User | null } = {
//     user: null,
// };
// const userSlice = createSlice({
//     name: 'user',
//     initialState,
//     reducers: {
//         setMe(state, action: PayloadAction<User>) {
//             state.user = action.payload;
//             console.log('setMe thành công', action.payload);
//         },
//         clearUser(state) {
//             state.user = null;
//             console.log('clearUser thành công', state.user);
//         },
//     },
// });

// export const { setMe, clearUser } = userSlice.actions;
// export default userSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@/models/user';

interface UserState {
    user: User | null;
    accessToken: string | null;
    refreshToken: string | null;
}

const initialState: UserState = {
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
        setTokens(state, action: PayloadAction<{ accessToken: string; refreshToken: string }>) {
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            console.log('setTokens thành công', action.payload);
        },
        clearUser(state) {
            state.user = null;
            state.accessToken = null;
            state.refreshToken = null;
            console.log('clearUser thành công', state);
        },
    },
});

export const { setMe, setTokens, clearUser } = userSlice.actions;
export default userSlice.reducer;