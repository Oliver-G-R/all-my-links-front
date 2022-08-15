export interface IPayloadToken {
    email: string
    exp: number
    iat: number
    id: string
    nickName: string
}

export interface IPayloadVerifyToken extends Omit<IPayloadToken, 'id'> {
    fullName: string
}
