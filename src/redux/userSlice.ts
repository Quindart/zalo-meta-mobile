import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@/models/user';
const initialState: { user: User | null } = {
    user: null,
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
    },
});

export const { setMe, clearUser } = userSlice.actions;
export default userSlice.reducer;