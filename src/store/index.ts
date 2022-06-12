import { createStore } from 'vuex'
import userModule from './auth/index'
import { AuthState } from './auth/state'

export interface IState {
    user: AuthState
}

export const store = createStore<IState>({
    modules: {
        user: userModule
    }
})
