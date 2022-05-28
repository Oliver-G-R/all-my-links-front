<script  lang="ts" setup>
    import { reactive, ref } from 'vue'
    import { useValidateAuthForm } from '../composables/useValidateAuthForm'
    import Alert from './Alert.vue'
    import authServices from '../services/Auth'
    import { IinputData } from '../models/FormAuth/index'

    interface Props{
        typeForm: 'sign-in' | 'sign-up'
    }

    const props = defineProps<Props>()

    const error = ref('')

    const inputData = reactive<IinputData>({
        email: '',
        password: '',
        nickName: '',
        nickNameOrEmail: '',
        repeatPassword: ''
    })

    const { v$, state } = useValidateAuthForm(inputData)

    const setErrors = (err: Array<string> | string) => {
        error.value = typeof err === 'string'
            ? err
            : err[0]
    }

    const checkAllErros = ():boolean => {
        if (props.typeForm === 'sign-up') {
            if (v$.value.nickName.$error || v$.value.password.$error || v$.value.email.$error || v$.value.repeatPassword.$error) {
                return false
            }
            return true
        } else {
            if (!v$.value.nickNameOrEmail.$error || !v$.value.password.$error) {
                return true
            }
            return false
        }
    }

    const handleSubmit = async () => {
        v$.value.$validate()
        const validErrors = checkAllErros()
        if (validErrors) {
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
            :class="{'error': v$.nickNameOrEmail.$error}"
            v-model="state.nickNameOrEmail"
            placeholder="Nick Name or email"
            type="text">

        <span
            class="alert-filed"
            v-if="v$.nickNameOrEmail.$error && props.typeForm === 'sign-in'">
            {{v$.nickNameOrEmail.$errors[0].$message}}
        </span>

        <input
            v-if="props.typeForm === 'sign-up'"
            class="form-auth__input"
            :class="{'error': v$.nickName.$error}"
            v-model="state.nickName"
            placeholder="Nick Name"
            type="text">

        <span
            class="alert-filed"
            v-if="v$.nickName.$error && props.typeForm === 'sign-up'">
            {{v$.nickName.$errors[0].$message}}
        </span>

        <input
            v-if="props.typeForm === 'sign-up'"
            class="form-auth__input"
            :class="{'error': v$.email.$error}"
            v-model="state.email"
            placeholder="Email"
            type="text">

        <span
            class="alert-filed"
            v-if="v$.email.$error && props.typeForm === 'sign-up'">
            {{v$.email.$errors[0].$message}}
        </span>

        <input
            class="form-auth__input"
            :class="{'error': v$.password.$error}"
            v-model="state.password"
            placeholder="Password"
            type="password">

        <span
            class="alert-filed"
            v-if="v$.password.$error">
            {{v$.password.$errors[0].$message}}
        </span>

        <input
            class="form-auth__input"
            :class="{'error': v$.repeatPassword.$error}"
            v-if="props.typeForm === 'sign-up'"
            v-model="state.repeatPassword"
            placeholder="Repeat password"
            type="password">

        <span
            class="alert-filed"
            v-if="v$.repeatPassword.$error && props.typeForm === 'sign-up'">
            {{v$.repeatPassword.$errors[0].$message}}
        </span>

        <button
            class="form-auth__button"
            type="submit">
            {{ props.typeForm == "sign-up" ? "Sign Up" : "Sign In" }}
        </button>
    </form>
</template>
