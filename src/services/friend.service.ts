import { ILogin, IRegister, IUser, IChangePassword } from "@/types/IUser"
import axiosConfig from "./axios.config"

const api = "api/v1/friends"

// TODO: GET FRIENDS LIST
export const getFriendsList = async () => {
    return await axiosConfig.get(`${api}`);
}
