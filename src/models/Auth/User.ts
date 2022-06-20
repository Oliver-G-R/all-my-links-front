import { IResponseError } from './Auth'

interface Ilinks{
    titleLink: string
    link: string
    socialIcon: string
    id: string
}

interface ILinksResponse extends Ilinks, IResponseError {}
interface IStateFieldsLinks extends Omit<Ilinks, 'id'>{}

interface Iuser{
    createdAt: Date
    email: string
    id: string
    links: Ilinks[]
    nickName: string
    updatedAt: Date
    avatar_public_id: string | null
    avatar_url: string | null
}
interface IUserResponse extends Iuser, IResponseError{}
interface IStateFieldsUser {
    nickName: string
    email: string
    avatar_url: string | null
}
interface IglobalUsers {
    id: string
    nickName: string
    links: Ilinks[]
}

export type {
    Ilinks,
    Iuser,
    ILinksResponse,
    IglobalUsers,
    IStateFieldsLinks,
    IStateFieldsUser,
    IUserResponse
}
