import { MutationTree } from 'vuex'
import { IResponseUser } from '../../models/Auth/Auth'
import { UserState } from './state'

const mutation: MutationTree<UserState> = {
    setDataUser (state, user:IResponseUser) {
        state.user = {
            token: user.token,
            isActive: true
        }
    },
    setError (state, error:string) {
        state.error = error
    }
}

export default mutation
