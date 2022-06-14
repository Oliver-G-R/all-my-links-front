interface Ilinks{
    titleLink: string
    link: string
    socialName: string
    socialIcon: string
    id: string
}

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

interface IglobalUsers {
    id: string
    nickName: string
    links: Ilinks[]
}

export type {
    Ilinks,
    Iuser,
    IglobalUsers
}
