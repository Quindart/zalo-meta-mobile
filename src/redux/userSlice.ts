import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@/models/user';

// Đảm bảo type User khớp với dữ liệu từ API
const initialState: { user: User | null } = {
    user: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // action.payload là User, không phải GetUserResponse
        setMe(state, action: PayloadAction<User>) {
            state.user = action.payload;
            console.log('setMe thành công', action.payload);
        },
        clearUser(state) {
            state.user = null;
        },
    },
});

export const { setMe, clearUser } = userSlice.actions;
export default userSlice.reducer;