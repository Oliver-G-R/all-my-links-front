<script lang="ts" setup>
    import { ref, computed } from 'vue'
    import { ResponseTypeAlert } from '../models/Alert'
    import { sendMailForResetPassword } from '../services/Auth/index'
    import { useTimeOut } from '../composables/useTimeOut'
    const email = ref('')
    const messageForm = ref<ResponseTypeAlert>()
    const isLoading = ref(false)
    const { isDisableButton, stringTime, startTime } = useTimeOut('time-forgot-pasword', 120000)
    const isEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

    const validMail = computed(() => {
        if (email.value.length > 0) {
            if (isEmail.test(email.value)) {
                return true
            } else {
                return false
            }
        } else {
            return true
        }
    })

    const sendEmail = async () => {
        if (isEmail.test(email.value)) {
            startTime()
            isLoading.value = true
            const respone = await sendMailForResetPassword(email.value)
            isLoading.value = false
            if (respone.data === 200) {
                messageForm.value = {
                    message: 'Email sent',
                    type: 'Success'
                }
            } else if (respone.error?.statusCode === 429) {
                messageForm.value = {
                    message: 'Too many requests',
                    type: 'Error'
                }
            } else {
                messageForm.value = {
                    message: respone.error?.message as string,
                    type: 'Error'
                }
            }
        }
    }

</script>
<template>
    <main class="container">
        <h1>
            Send email for reset password
        </h1>
        <p>
            A token will be sent to your email, you will have 1 minute to access it, otherwise you will need to re-enter your email within 2 minutes.
        </p>

        <form @submit.prevent="sendEmail">
            <input
                :disabled="isDisableButton"
                v-model="email"
                :class="!validMail && 'fail'"
                placeholder="myemail@example.com"
                type="email">
            <button :disabled="isDisableButton || !validMail || isLoading" >
                {{ isDisableButton ? `02:00 - ${stringTime}`: 'Send' }}
            </button>
        </form>
        <span :class="['message-form', messageForm.type === 'Success' ? 'success' : 'error']" v-if="messageForm">{{messageForm.message}}</span>
    </main>
</template>

<style lang="scss" scoped>
    main{
        height: 80vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        p{
            font-size: 1.6rem;
        }
        form{
            display: flex;
            margin-top: 2rem;
            input{
                width: 100%;
                height: 3rem;
                border: 1px solid #ccc;
                border-radius: .25rem;
                padding: .5rem;
                margin-bottom: 1rem;
                outline: none;
                border-width: 2px;
                font-size: 1.6rem;
                &.fail{
                    border-color: rgb(244, 133, 149);
                   animation: shake 0.82s cubic-bezier(.36,.07,.19,.97) both;
                }
                &:disabled{
                    cursor: not-allowed;
                    color: #ccc;
                }
            }
            button{
                width: 15rem;
                height: 3rem;
                margin-left: 1rem;
                border: 1px solid #ccc;
                border-radius: .25rem;
                padding: .5rem;
                background: #00a8ff;
                color: #fff;
                font-weight: bold;
                cursor: pointer;
                outline: none;
                &:disabled{
                    opacity: .5;
                }
            }

        }
        .message-form{
            &.success{
                color: #29cb57;
            }
            &.error{
                color: #ff0000;
            }
        }
    }

@keyframes shake {
    10%, 90% {
        transform: translate3d(-1px, 0, 0);
    }
    20%, 80% {
        transform: translate3d(2px, 0, 0);
    }
    30%, 50%, 70% {
        transform: translate3d(-4px, 0, 0);
    }
    40%, 60% {
        transform: translate3d(4px, 0, 0);
    }
}
</style>
