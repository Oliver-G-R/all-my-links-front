import { Iuser } from './Auth/User'

export interface IPayloadToken {
    email: string
    exp: number
    iat: number
    id: string
    nickName: string
}

export interface IPayloadVerifyToken extends Omit<IPayloadToken, 'id'> {
    fullName: string
    pass: string
}

export interface JWTResponse{
    token: string,
    user: Iuser
}
