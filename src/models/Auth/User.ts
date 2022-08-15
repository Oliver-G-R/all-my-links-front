import { IResponseError } from './Auth'

interface Ilink{
    titleLink: string
    link: string
    socialIcon: string
    id: string
}

interface IStateFieldsLinks extends Omit<Ilink, 'id'>{}

interface IGenericResponse<T>{
    data?: T
    error?: IResponseError
}
interface Iuser{
    createdAt: Date
    email: string
    id: string
    links: Ilink[]
    principalAccount: Ilink | null
    nickName: string
    updatedAt: Date
    fullName:string
    bio: string
    avatar_public_id: string
    avatar_url: string
}
interface IStateFieldsUser {
    nickName: string
    email: string
    fullName: string
    bio: string
    avatar_url: string
}
interface IglobalUsers {
    id: string
    nickName: string
    avatar_url: string
    principalAccount: Ilink | null
    fullName:string
}

export type {
    Ilink,
    Iuser,
    IglobalUsers,
    IStateFieldsLinks,
    IStateFieldsUser,
    IGenericResponse
}
