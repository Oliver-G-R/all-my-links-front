import { createStore } from 'vuex'
import userModule from './user/index'
import { UserState } from './user/state'

export interface IState {
    user: UserState
}

export const store = createStore<IState>({
    modules: {
        user: userModule
    }
})
