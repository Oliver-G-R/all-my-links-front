import { Module } from 'vuex'
import { IState } from '../index'

import state, { AuthState } from './state'

import actions from './actions'
import getters from './getters'
import mutations from './mutations'

const userModule: Module<AuthState, IState> = {
    namespaced: true,
    actions,
    getters,
    mutations,
    state
}

export default userModule
