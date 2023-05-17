import { ActionTree } from 'vuex'
import { AuthState } from './state'
import { IState } from '../index'
import { linksApi } from '../../axios/index'
import { IResponseAuth, ISignIn, ISignUp } from '../../models/Auth/Auth'
import { TOKEN_USER } from '../../constants/auth'
import { getAccessToken, getIDFromToken } from '../../helpers/validToken'
import router from '../../router/index.router'
import { useCookies } from 'vue3-cookies'

const actions: ActionTree<AuthState, IState> = {
    async signIn ({ commit }, payload:ISignIn) {
        const response = await linksApi.post<IResponseAuth>('/auth/signIn', {
            nickNameOrEmail: payload.nickNameOrEmail,
            password: payload.password
        })

        const { cookies } = useCookies()

        cookies.set(TOKEN_USER, response.data.token)

        commit('setDataUser', {
            token: response.data.token,
            isActive: true,
            id: response.data.user.id
        })
        router.push(`/${response.data.user.nickName}`)
    },

    async signUp ({ commit }, payload:ISignUp) {
        await linksApi.post('/auth/signUp', {
            email: payload.email,
            password: payload.password,
            fullName: payload.fullName,
            nickName: payload.nickName
        })

        router.push('/auth/verify')
    },

    logout ({ commit }) {
        const { cookies } = useCookies()
        cookies.remove(TOKEN_USER)
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
       }
    }
}

export default actions
