import { MutationTree } from 'vuex'
import { Ilinks } from '../../models/Auth/User'
import { UserState } from './state'

const mutation: MutationTree<UserState> = {
    setOwnerProfileUser (state, user) {
        state.profileOwnerUser = user
    },

    setGlobalUsers (state, users) {
        state.globalUsers.loading = users.loading
        state.globalUsers.users = users.users
    },

    setLinksUser (state, link: Ilinks) {
        state.profileOwnerUser.links.push(link)
    },

    setProfileAvatar (state, avatar_url:string) {
        state.profileOwnerUser.avatar_url = avatar_url
    },

    updateLinks (state, link:Ilinks) {
        state.profileOwnerUser.links =
            state.profileOwnerUser.links.map(item =>
                item.id === link.id ? link : item
            )
    }
}

export default mutation
