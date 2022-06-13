import { IglobalUsers, Iuser } from '../../models/Auth/User'

export interface UserState {
    globalUsers: {
        users: IglobalUsers[]
        loading : boolean
    },

    profileOwnerUser: Iuser
}

const state = (): UserState => {
    return {
        globalUsers: {
            users: [],
            loading: true
        },
        profileOwnerUser: {
            email: '',
            id: '',
            links: [],
            nickName: '',
            updatedAt: new Date(),
            createdAt: new Date()
        }
    }
}

export default state
