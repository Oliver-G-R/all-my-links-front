import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { TOKEN_USER } from '../constants/auth'
import { expiredToke, getDataFromToken } from '../helpers/validToken'
import router from '../router/index.router'
import { resendEmailWithToken, createUserAfterConfirm } from '../services/Auth'
import { store } from '../store/index'

export const useConfirmAccount = () => {
    const tokenQuery = ref()
    const route = useRoute()
    const error = ref('')
    const tokenExpired = ref(false)
    const isVerify = ref(false)
    const resendValid = ref(false)

    const resendEmail = async () => {
        const user = getDataFromToken(tokenQuery.value)
        const response = await resendEmailWithToken(user)
        error.value = ''
        if (response.error?.statusCode === 429) {
          error.value = 'You have reached the limit of resend email'
          resendValid.value = false
        } else if (response.error?.statusCode === 400) {
          error.value = response.error.message
          resendValid.value = false
        } else {
            resendValid.value = true
        }
    }

    const createUser = async () => {
        const resp = await createUserAfterConfirm(tokenQuery.value)
        if (resp.data) {
            isVerify.value = true
            setTimeout(() => {
                store.commit('auth/setDataUser', {
                    token: resp.data?.token,
                    isActive: true,
                    id: resp.data?.user.id
                })
                localStorage.setItem(TOKEN_USER, resp.data?.token as string)
                router.push({ name: 'profile', params: { nickName: resp.data?.user.nickName } })
            }, 2000)
        } else {
            error.value = 'Error to create user'
        }
    }

    onMounted(async () => {
        tokenQuery.value = route.query.token || ''
        try {
            if (!tokenQuery.value) error.value = 'Waitin for token.... Please verify your email'
            else if (!expiredToke(tokenQuery.value)) {
                await createUser()
            } else {
            error.value = 'Token is expired'
            tokenExpired.value = true
            }
        } catch (e) {
            error.value = 'Token is invalid'
        }
    })

    return {
        resendEmail,
        error,
        tokenExpired,
        isVerify,
        resendValid
    }
}
