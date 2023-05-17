import { Iuser } from './User'

interface ISignIn {
    password: string
    nickNameOrEmail: string
}

interface ISignUp {
    fullName: string
    nickName: string
    email: string
    password: string
}

interface IResponseError {
    message: string
    statusCode: number

}

interface IResponseAuth extends IResponseError {
    token: string
    user: Iuser
}
interface CookiesConfig {
    expireTimes: string | number | Date;
    path?: string;
    domain?: string;
    secure?: boolean;
    sameSite?: string;
}
export type{
    ISignIn,
    ISignUp,
    IResponseAuth,
    IResponseError,
    CookiesConfig
}
