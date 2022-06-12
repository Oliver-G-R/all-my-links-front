import { ActionTree } from 'vuex'
import { AuthState } from './state'
import { IState } from '../index'
import { linksApi } from '../../axios/index'
import { ISignIn, ISignUp } from '../../models/Auth/Auth'
import { TOKEN_USER } from '../../constants/auth'
import { getAccessToken } from '../../helpers/validToken'
import router from '../../router/index.router'

const actions: ActionTree<AuthState, IState> = {
    async signIn ({ commit }, payload:ISignIn) {
        try {
            const response = await linksApi.post('/auth/signIn', {
                nickNameOrEmail: payload.nickNameOrEmail,
                password: payload.password
            })

            window.localStorage.setItem(TOKEN_USER, response.data.token)
            commit('setDataUser', {
                token: response.data.token,
                isActive: true
            })
            router.push('/')
        } catch (error) {
            commit('setError', error.response.data.message)
        }
    },

    async signUp ({ commit }, payload:ISignUp) {
        try {
            const response = await linksApi.post('/auth/signUp', {
                email: payload.email,
                password: payload.password,
                nickName: payload.nickName
            })

            window.localStorage.setItem(TOKEN_USER, response.data.token)
            commit('setDataUser', {
                token: response.data.token,
                isActive: true
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
            isActive: false
        })
        router.push('/signIn')
    },

    getToken ({ commit }) {
        const token = getAccessToken()
        if (token) {
            commit('setDataUser', {
                token,
                isActive: true
            })
        }
    }
}

export default actions
