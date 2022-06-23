import { IglobalUsers, Iuser } from '../../models/Auth/User'

export interface UserState {
    globalUsers: {
        users: IglobalUsers[]
    },

    profileOwnerUser: Iuser,

    errorGetOwnerUser: string | null
}

const state = (): UserState => {
    return {
        globalUsers: {
            users: []
        },
        profileOwnerUser: {
            email: '',
            id: '',
            links: [],
            nickName: '',
            updatedAt: new Date(),
            createdAt: new Date(),
            avatar_public_id: null,
            avatar_url: null
        },
        errorGetOwnerUser: null
    }
}

export default state
