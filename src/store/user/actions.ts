import { ActionTree } from 'vuex'
import { UserState } from './state'
import { IState, store } from '../index'
import { linksApi } from '../../axios/index'
import { IglobalUsers, Iuser } from '../../models/Auth/User'
import { TOKEN_USER } from '../../constants/auth'
import router from '../../router/index.router'
import { catchError } from '../../helpers/errors'
const actions: ActionTree<UserState, IState> = {
    async getUsers ({ commit }) {
        const response = await linksApi.get<IglobalUsers>('user/global-users')
        commit('setGlobalUsers', {
            users: response.data
        })
    },

    async getOwnerProfileUser ({ commit }, token: string) {
        try {
            const response = await linksApi.get<Iuser>('user/profile', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            commit('setOwnerProfileUser', response.data)
        } catch (error) {
            if (catchError(error)?.message === 'Not Found') {
                window.localStorage.removeItem(TOKEN_USER)
                store.commit('auth/setDataUser', {
                    isActive: false,
                    token: null,
                    id: null
                })
                router.push('/signIn')
            }
        }
    }

}

export default actions
