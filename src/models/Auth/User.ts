import { IResponseError } from './Auth'

interface Ilinks{
    titleLink: string
    link: string
    socialIcon: string
    id: string
}

interface ILinksResponse extends Ilinks, IResponseError {}
interface IStateFieldsLinks extends Omit<Ilinks, 'id'>{}

interface IAvatarResponse extends IResponseError{
    avatar_url: string
}
interface Iuser{
    createdAt: Date
    email: string
    id: string
    links: Ilinks[]
    principalAccount: Ilinks | null
    nickName: string
    updatedAt: Date
    fullName:string
    bio: string
    avatar_public_id: string | null
    avatar_url: string | null
}
interface IUserResponse extends Iuser, IResponseError{}
interface IStateFieldsUser {
    nickName: string
    email: string
    fullName: string
    bio: string
    avatar_url: string | null
}
interface IglobalUsers {
    id: string
    nickName: string
    avatar_url?: string | null
}

export type {
    Ilinks,
    Iuser,
    ILinksResponse,
    IglobalUsers,
    IStateFieldsLinks,
    IStateFieldsUser,
    IUserResponse,
    IAvatarResponse
}
