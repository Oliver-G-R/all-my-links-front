import { ActionTree } from 'vuex'
import { AuthState } from './state'
import { IState } from '../index'
import { linksApi } from '../../axios/index'
import { IResponseUser, ISignIn, ISignUp } from '../../models/Auth/Auth'
import { TOKEN_USER } from '../../constants/auth'
import { getAccessToken, getIDFromToken } from '../../helpers/validToken'
import router from '../../router/index.router'

const actions: ActionTree<AuthState, IState> = {
    async signIn ({ commit }, payload:ISignIn) {
        try {
            const response = await linksApi.post<IResponseUser>('/auth/signIn', {
                nickNameOrEmail: payload.nickNameOrEmail,
                password: payload.password
            })

            window.localStorage.setItem(TOKEN_USER, response.data.token)
            commit('setDataUser', {
                token: response.data.token,
                isActive: true,
                id: response.data.user.id
            })
            router.push('/')
        } catch (error) {
            commit('setError', error.response.data.message)
        }
    },

    async signUp ({ commit }, payload:ISignUp) {
        try {
            const response = await linksApi.post<IResponseUser>('/auth/signUp', {
                email: payload.email,
                password: payload.password,
                nickName: payload.nickName
            })

            window.localStorage.setItem(TOKEN_USER, response.data.token)
            commit('setDataUser', {
                token: response.data.token,
                isActive: true,
                id: response.data.user.id
            })
            router.push('/')
        } catch (error) {
            commit('setError', error.response.data.message)
        }
    },

    logout ({ commit }) {
        window.localStorage.removeItem(TOKEN_USER)
        commit('setDataUser', {
            token: null,
            isActive: false,
            id: null
        })
        router.push('/signIn')
    },

    getToken ({ commit }) {
        const token = getAccessToken()

        if (token) {
            const id = getIDFromToken(token)
            commit('setDataUser', {
                token,
                isActive: true,
                id
            })
        }
    }
}

export default actions
