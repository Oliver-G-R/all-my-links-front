import { Module } from 'vuex'
import { IState } from '../index'

import state, { UserState } from './state'

import actions from './actions'
import getters from './getters'
import mutations from './mutations'

const userModule: Module<UserState, IState> = {
    namespaced: true,
    actions,
    getters,
    mutations,
    state
}

export default userModule
