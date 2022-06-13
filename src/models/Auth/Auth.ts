import { Iuser } from './User'

interface ISignIn {
    password: string
    nickNameOrEmail: string
}

interface ISignUp {
    nickName: string
    email: string
    password: string
}

interface IResponseError {
    message: Array<string> | string
    error: string
    statusCode: number

}

interface IResponseUser extends IResponseError {
    token: string
    user: Iuser
}

export type{
    ISignIn,
    ISignUp,
    IResponseUser,
    IResponseError
}
