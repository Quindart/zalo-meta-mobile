import { ILogin, IRegister, IUser, IChangePassword } from "@/types/IUser"
import axiosConfig from "./axios.config"

const api = "api/v1/me"
const api1 = "api/v1/users"

//TODO: CHANGE PASSWORD
export const changePassword = async ({ password, newPassword }: IChangePassword) => {
    return await axiosConfig.put(`${api}/change-password`, { password, newPassword })
}

//TODO: SEARCH USER BY PHONE
export const searchUserByPhone = async (type: string, keywords: string) => {
    return await axiosConfig.get(`${api1}/search`, {
        params: {
            type,
            keywords
        }
    });
}

//TODO: GET USER BY ID
export const getUserById = async (userId: string) => {
    return await axiosConfig.get(`${api1}/${userId}`);
}