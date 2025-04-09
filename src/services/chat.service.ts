import axiosConfig from "./axios.config"
const API_CHAT = "api/v1/chats"
export const getChatList = async () => {
    return await axiosConfig.get(`${API_CHAT}/mychat`);
}