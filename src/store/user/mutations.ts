import { MutationTree } from 'vuex'
import { UserState } from './state'

const mutation: MutationTree<UserState> = {
    setOwnerProfileUser (state, user) {
        state.profileOwnerUser = user
    },

    setGlobalUsers (state, users) {
        state.globalUsers.loading = users.loading
        state.globalUsers.users = users.users
    },

    setLinksUser (state, link) {
        state.profileOwnerUser.links.push(link)
    },

    setProfileAvatar (state, avatar_url:string) {
        state.profileOwnerUser.avatar_url = avatar_url
    }
}

export default mutation
