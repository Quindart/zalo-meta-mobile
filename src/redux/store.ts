import { configureStore } from '@reduxjs/toolkit';
import userReducer from '@/redux/userSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
    },
});

// Định nghĩa RootState và AppDispatch để dùng với TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;