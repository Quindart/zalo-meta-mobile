import { ILogin, IRegister, IUser } from "@/types/IUser"
import axiosConfig from "./axios.config"

const api = "api/v1/auth"
//TODO: LOGIN
export const login = async ({ phone, password }: ILogin) => {
    return await axiosConfig.post(`${api}/login`, { phone, password })
}

//TODO: REGISTER
export const register = async ({ phone, password, email, firstName, lastName, dateOfBirth }: IRegister) => {
    return await axiosConfig.post(`${api}/register`, { phone, password, email, firstName, lastName, dateOfBirth })
}

//TODO: CHANGE PASSWORD
export const changePassword = async ({ password, newPassword }: { password: string; newPassword: string }) => {
    return await axiosConfig.put(`api/v1/me/change-password`, { password, newPassword })
}
