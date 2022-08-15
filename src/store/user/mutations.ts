import { MutationTree } from 'vuex'
import { Ilink } from '../../models/Auth/User'
import { UserState } from './state'

const mutation: MutationTree<UserState> = {
    setOwnerProfileUser (state, user) {
        state.profileOwnerUser = user
    },

    setGlobalUsers (state, users) {
        state.globalUsers.users = users.users
    },

    setLinksUser (state, link: Ilink) {
        state.profileOwnerUser.links.push(link)
    },

    setProfileAvatar (state, avatar_url:string) {
        state.profileOwnerUser.avatar_url = avatar_url
    },

    updateLinks (state, link:Ilink) {
        state.profileOwnerUser.links =
            state.profileOwnerUser.links.map(item =>
                item.id === link.id ? link : item
            )
    },

    removeLink (state, id:string) {
        state.profileOwnerUser.links = state.profileOwnerUser.links
            .filter(item => item.id !== id)
    },

    setPrincipalAccount (state, link: Ilink | null) {
        state.profileOwnerUser.principalAccount = link
    }
}

export default mutation
