import { GetterTree } from 'vuex'
import { UserState } from './state'
import { IState } from '../index'

const getters: GetterTree<UserState, IState> = {
    stateActivUser (state): boolean {
        return state.user.isActive
    }

}

export default getters
