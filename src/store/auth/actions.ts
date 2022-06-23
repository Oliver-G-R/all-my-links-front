import { ActionTree } from 'vuex'
import { AuthState } from './state'
import { IState } from '../index'
import { linksApi } from '../../axios/index'
import { IResponseAuth, ISignIn, ISignUp } from '../../models/Auth/Auth'
import { TOKEN_USER } from '../../constants/auth'
import { getAccessToken, getIDFromToken } from '../../helpers/validToken'
import router from '../../router/index.router'

const actions: ActionTree<AuthState, IState> = {
    async signIn ({ commit }, payload:ISignIn) {
        const response = await linksApi.post<IResponseAuth>('/auth/signIn', {
            nickNameOrEmail: payload.nickNameOrEmail,
            password: payload.password
        })

        window.localStorage.setItem(TOKEN_USER, response.data.token)
        commit('setDataUser', {
            token: response.data.token,
            isActive: true,
            id: response.data.user.id
        })
        router.push(`/${response.data.user.nickName}`)
    },

    async signUp ({ commit }, payload:ISignUp) {
        const response = await linksApi.post<IResponseAuth>('/auth/signUp', {
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
        router.push(`/${response.data.user.nickName}`)
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
       try {
        const token = getAccessToken()

        if (token) {
            const id = getIDFromToken(token)
            commit('setDataUser', {
                token,
                isActive: true,
                id
            })
        }
       } catch (error) {
        console.log(error)
       }
    }
}

export default actions
