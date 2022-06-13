import { MutationTree } from 'vuex'
import { AuthState } from './state'

const mutation: MutationTree<AuthState> = {
    setDataUser (state, user) {
        state.user = {
            token: user.token,
            isActive: user.isActive,
            id: user.id
        }
    },
    setError (state, error:string) {
        state.error = error
    }
}

export default mutation
