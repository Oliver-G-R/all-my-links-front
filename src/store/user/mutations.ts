import { MutationTree } from 'vuex'
import { UserState } from './state'

const mutation: MutationTree<UserState> = {
    setOwnerProfileUser (state, user) {
        state.profileOwnerUser = user
    },

    setGlobalUsers (state, users) {
        state.globalUsers.loading = users.loading
        state.globalUsers.users = users.users
    }
}

export default mutation
