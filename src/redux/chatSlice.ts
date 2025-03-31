import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Chat } from '@/models/chat';
const initialState: { chats: Chat[] | [] } = {
    chats: [],
};
const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setChatList(state, action: PayloadAction<Chat[]>) {
            state.chats = action.payload;
        }
    },
});

export const { setChatList } = chatSlice.actions;
export default chatSlice.reducer;