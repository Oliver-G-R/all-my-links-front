import { createStore } from 'vuex'
import authModule from './auth/index'
import { AuthState } from './auth/state'
import { UserState } from './user/state'
import userModule from './user/index'

export interface IState {
    auth: AuthState
    user: UserState
}

export const store = createStore<IState>({
    modules: {
        auth: authModule,
        user: userModule
    }
})
