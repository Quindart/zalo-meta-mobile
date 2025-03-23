export interface User {
    _id: string;
    email: string;
    password: string;
    avatar: string;
    phone: string;
    dateOfBirth: string;
    firstName: string;
    lastName: string;
    isTwoFactorAuthenticationEnabled: boolean;
    isVerifiedMail: boolean;
    updatedAt: string;
    createdAt: string;
    __v: number;
}