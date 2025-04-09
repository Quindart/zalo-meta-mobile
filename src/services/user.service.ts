import { ILogin, IRegister, IUser } from "@/types/IUser"
import axiosConfig from "./axios.config"

const api = "api/v1/users"
//TODO: FIND USER BY PHONE
export const findUserByPhone = async (phone: string): Promise<any> => {
    try {
        const queries = "?queries=email,_id";
        const url = `${api}/phone/${phone}${queries}`;
        return await axiosConfig.get(url);
    } catch (error: any) {
        console.error("Error finding user by phone:", error);
        return error?.response?.data;
    }
};