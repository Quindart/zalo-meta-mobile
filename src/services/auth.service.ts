import { ILogin, IRegister, IUser } from "@/types/IUser"
import axiosConfig from "./axios.config"

const API = "api/v1/auth"
//TODO: LOGIN
export const login = async ({ phone, password }: ILogin) => {
    return await axiosConfig.post(`${API}/login`, { phone, password })
}

//TODO: REGISTER
export const register = async ({ phone, password, email, firstName, lastName, dateOfBirth }: IRegister) => {
    return await axiosConfig.post(`${API}/register`, { phone, password, email, firstName, lastName, dateOfBirth })
}
