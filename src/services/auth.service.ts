import { ILogin, IRegister, IUser } from "@/types/IUser"
import axiosConfig from "./axios.config"
import { isAction } from "@reduxjs/toolkit"

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
//TODO: VERIFY OTP
export const verifyOTP = async (OTP: string, email: string): Promise<any> => {
    try {
        const url = `${api}/verify-forgot-password`;
        return await axiosConfig.post(url, { email, otp: OTP });
    } catch (error: any) {
        console.error("Error fetching user data:", error);
        return error?.response.data;
    }
}
//TODO: SEND OTP
export const sendOTP = async (email: string): Promise<any> => {
    try {
        const url = `${api}/forgot-password`;
        return await axiosConfig.post(url, { email });
    } catch (error: any) {
        console.error("Error fetching user data:", error);
        return error?.response.data;
    }
}
//TODO: RESET PASSWORD
export const resetPassword = async (email: string, password: string, resetToken: string): Promise<any> => {
    try {
        const url = `${api}/reset-password`;
        return await axiosConfig.post(url, { email, password, resetToken });
    } catch (error: any) {
        console.error("Error fetching user data:", error);
        return error?.response.data;
    }
}

//TODO: GET INFOR PC LOGIN
export const getInforQR = async (token: string) => {
    try {
        const url = `${api}/QR`;
        const response = await axiosConfig.get(url, { params: { tokenQR: token } });
        return response;
    } catch (error: any) {
        console.error("Error fetching user data:", error);
        return error?.response.data;
    }
}
//TODO: QR
export const loginQR = async (token: string) => {
    try {
        const url = `${api}/QR/login`;

        const response = await axiosConfig.post(url, {
            accessToken: token,
            isAction: token.length > 0
        });
        return response;
    } catch (error: any) {
        console.error("Error fetching user data:", error);
        return error?.response.data;
    }
}
