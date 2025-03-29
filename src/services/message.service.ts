import axiosConfig from "./axios.config";

const API = "/api/v1/messages";
export const getMessages = async (receiverId: string, senderId: string) => {
    return await axiosConfig.get(`${API}/${receiverId}/${senderId}`);
};
export const getMessagesByChatId = async (chatId: string) => {
    return await axiosConfig.get(`${API}?chatId=${chatId}`);
};
