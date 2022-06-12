import { GetterTree } from 'vuex'
import { AuthState } from './state'
import { IState } from '../index'

const getters: GetterTree<AuthState, IState> = {
    stateActivUser (state): boolean {
        return state.user.isActive
    }

}

export default getters
