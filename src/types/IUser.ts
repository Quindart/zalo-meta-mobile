export type IUser = { phone: string; password: string; email: string; avatar: string; firstName: string; lastName: string; dateOfBirth: string }
export type IRegister = Partial<IUser>
export type ILogin = Partial<Pick<IUser, 'phone' | 'password'>>
