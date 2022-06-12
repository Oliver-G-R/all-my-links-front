import { MutationTree } from 'vuex'
import { UserState } from './state'

const mutation: MutationTree<UserState> = {
    setDataUser (state, user) {
        state.user = {
            token: user.token,
            isActive: user.isActive
        }
    },
    setError (state, error:string) {
        state.error = error
    }
}

export default mutation
