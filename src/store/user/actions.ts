import { ActionTree } from 'vuex'
import { UserState } from './state'
import { IState } from '../index'
import { linksApi } from '../../axios/index'
import { IglobalUsers, Iuser } from '../../models/Auth/User'

const actions: ActionTree<UserState, IState> = {
    async getUsers ({ commit }, currentUserId: string) {
        const urlRequest = currentUserId
            ? `user/global-users?currentUserId=${currentUserId}`
            : 'user/global-users'

        try {
            const response = await linksApi.get<IglobalUsers>(urlRequest)

            commit('setGlobalUsers', {
                users: response.data,
                loading: false
            })
        } catch (error) {

        }
    },

    async getOwnerProfileUser ({ commit }, token: string) {
        try {
            const response = await linksApi.get<Iuser>('user/profile', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            console.log(response.data)

            commit('setOwnerProfileUser', response.data)
        } catch (error) {

        }
    }
}

export default actions
