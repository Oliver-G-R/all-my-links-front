<script lang="ts" setup>
    import { ref } from 'vue'
    import { useRoute } from 'vue-router'
    import { ResponseTypeAlert } from '../models/Alert'
    import Alert from '../components/Alert.vue'
    import { resetPassword } from '../services/Auth'
    import { useStore } from 'vuex'
    import router from '../router/index.router'
    import { TOKEN_USER } from '../constants/auth'
    import { useCookies } from 'vue3-cookies'

    const alert = ref<ResponseTypeAlert>({
        message: '',
        type: null
    })

    const store = useStore()
    const route = useRoute()
    const password = ref<string>('')

    const resetPass = async () => {
        const cleanPassword = password.value.trim()
        const { cookies } = useCookies()
        if (cleanPassword.length > 8 && cleanPassword.length <= 20) {
            const response = await resetPassword(route.query.token as string, cleanPassword)
            if (response.data) {
                store.commit('auth/setDataUser', {
                    token: response.data.token,
                    isActive: true,
                    id: response.data.user.id
                })
                cookies.set(TOKEN_USER, response.data.token)

                router.push({ name: 'profile', params: { nickName: response.data.user.nickName } })
            } else if (response.error?.statusCode === 429) {
                alert.value = {
                    message: "You've sent too many requests. Please try again later.",
                    type: 'Error'
                }
            } else if (response.error?.statusCode === 401) {
                alert.value = {
                    message: 'Invalid token.',
                    type: 'Error'
                }
                setTimeout(() => {
                router.push('/signIn')
                }, 2000)
            } else {
                alert.value = {
                    message: response.error?.message as string,
                    type: 'Error'
                }
            }
        }
    }

</script>

<template>
    <Alert
        @set-state-alert="alert.message = $event"
        :type="alert.type"
        :message="alert?.message" />
    <main>
        <h1>
            Reset Password
        </h1>

        <form @submit.prevent="resetPass">
            <input
                v-model="password"
                type="password"
                placeholder="New password">
            <button>Send</button>
            <small>Min length is 8</small>
        </form>
    </main>
</template>

<style lang="scss" scoped>
    main{
        height: 80vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        form{
            input{
                width: 100%;
                height: 3rem;
                border: 1px solid #ccc;
                border-radius: .25rem;
                padding: .5rem;
                margin-bottom: 1rem;
                outline: none;
                font-size: 1.6rem;
            }
            button{
                width: 100%;
                height: 3rem;
                border: 1px solid #ccc;
                border-radius: .25rem;
                padding: .5rem;
                background: #00a8ff;
                color: #fff;
                font-weight: bold;
                cursor: pointer;
                outline: none;
            }
        }

    }
</style>
