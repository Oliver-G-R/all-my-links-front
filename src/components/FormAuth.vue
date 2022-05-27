<script  lang="ts" setup>
    import { reactive, ref } from 'vue'
    import Alert from './Alert.vue'
    import authServices from '../services/Auth'

    interface Props{
        typeForm: 'sign-in' | 'sign-up'
    }

    const props = defineProps<Props>()

    const error = ref('')

    const inputData = reactive({
        email: '',
        password: '',
        nickName: '',
        nickNameOrEmail: ''
    })

    const setErrors = (err: Array<string> | string) => {
        error.value = typeof err === 'string'
            ? err
            : err[0]
    }

    const handleSubmit = async () => {
        if (props.typeForm === 'sign-up') {
            const response = await authServices.signUp(inputData)
            if (response.token) {
                // TODO: SET TOKEN
            } else setErrors(response.message)
        } else if (props.typeForm === 'sign-in') {
            const response = await authServices.signIn(inputData)
            if (response.token) {
                // TODO: SET TOKEN
            } else setErrors(response.message)
        }
    }

</script>

<template>
    <form class="form-auth" @submit.prevent="handleSubmit">
        <Alert
            v-if="error"
            @closeAlert="(err) => error = err"
            :message="error"/>
        <input
            v-if="props.typeForm === 'sign-in'"
            class="form-auth__input"
            v-model="inputData.nickNameOrEmail"
            placeholder="Nick Name or email"
            type="text">
        <input
            v-if="props.typeForm === 'sign-up'"
            class="form-auth__input"
            v-model="inputData.nickName"
            placeholder="Name"
            type="text">
        <input
            v-if="props.typeForm === 'sign-up'"
            class="form-auth__input"
            v-model="inputData.email"
            placeholder="Email"
            type="text">
        <input
            class="form-auth__input"
            v-model="inputData.password"
            placeholder="Password"
            type="text">

        <button
            class="form-auth__button"
            type="submit">
            {{ props.typeForm == "sign-up" ? "Sign Up" : "Sign In" }}
        </button>
    </form>
</template>
