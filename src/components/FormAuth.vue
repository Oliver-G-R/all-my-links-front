<script  lang="ts" setup>
    import { reactive, toRefs, ref, onUnmounted } from 'vue'
    import { useValidateAuthForm } from '../composables/useValidateAuthForm'
    import Alert from './Alert.vue'
    import { IinputData } from '../models/FormAuth/index'
    import { useStore } from 'vuex'
    import { IState } from '../store/index'
    import { catchError } from '../helpers/errors'
    import { ResponseTypeAlert } from '../models/Alert'

    interface Props{
        typeForm: 'sign-in' | 'sign-up'
    }
    const messageAlert = ref<ResponseTypeAlert>({
        message: null,
        type: 'Info'
    })

    const store = useStore<IState>()
    const props = defineProps<Props>()

    const { typeForm } = toRefs(props)

    const inputData = reactive<IinputData>({
        email: '',
        password: '',
        nickName: '',
        nickNameOrEmail: '',
        repeatPassword: '',
        fullName: ''
    })

    const { v$, state } = useValidateAuthForm(inputData)

    const validFields = ():boolean => {
        if (typeForm.value === 'sign-up') {
            if (v$.value.fullName.$error || v$.value.nickName.$error || v$.value.password.$error || v$.value.email.$error || v$.value.repeatPassword.$error) {
                return false
            }
            return true
        } else {
            if (v$.value.nickNameOrEmail.$error || v$.value.password.$error) {
                return false
            }
            return true
        }
    }

    const handleSubmit = async () => {
        v$.value.$validate()
        const validErrors = validFields()

        if (validErrors) {
            try {
                if (typeForm.value === 'sign-up') {
                    await store.dispatch('auth/signUp', {
                        nickName: inputData.nickName,
                        password: inputData.password,
                        email: inputData.email,
                        fullName: inputData.fullName
                    })
                } else if (typeForm.value === 'sign-in') {
                    await store.dispatch('auth/signIn', {
                        nickNameOrEmail: state.nickNameOrEmail,
                        password: state.password
                    })
                }
            } catch (e) {
                messageAlert.value = {
                    message: catchError(e).message,
                    type: 'Error'
                }
            }
        }
    }

    onUnmounted(() => {
        if (messageAlert.value.message) {
            messageAlert.value.message = ''
        }
    })

</script>

<template>
    <Alert
        @setStateAlert="messageAlert.message = $event"
        :type="messageAlert.type"
        :message="messageAlert.message"/>
    <form class="form-auth" @submit.prevent="handleSubmit">
        <input
            v-if="typeForm === 'sign-in'"
            class="form-auth__input"
            :class="{'error': v$.nickNameOrEmail.$error}"
            v-model="state.nickNameOrEmail"
            placeholder="Nick Name or email"
            type="text">

        <span
            class="alert-filed"
            v-if="v$.nickNameOrEmail.$error && typeForm === 'sign-in'">
            {{v$.nickNameOrEmail.$errors[0].$message}}
        </span>

        <input
            v-if="typeForm === 'sign-up'"
            class="form-auth__input"
            :class="{'error': v$.nickName.$error}"
            v-model="state.nickName"
            placeholder="Nick Name"
            type="text">

        <span
            class="alert-filed"
            v-if="v$.nickName.$error && typeForm === 'sign-up'">
            {{v$.nickName.$errors[0].$message}}
        </span>

        <input
            v-if="typeForm === 'sign-up'"
            class="form-auth__input"
            :class="{'error': v$.fullName.$error}"
            v-model="state.fullName"
            placeholder="Full Name"
            type="text">

        <span
            class="alert-filed"
            v-if="v$.fullName.$error && typeForm === 'sign-up'">
            {{v$.fullName.$errors[0].$message}}
        </span>

        <input
            v-if="typeForm === 'sign-up'"
            class="form-auth__input"
            :class="{'error': v$.email.$error}"
            v-model="state.email"
            placeholder="Email"
            type="text">

        <span
            class="alert-filed"
            v-if="v$.email.$error && typeForm === 'sign-up'">
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
            v-if="typeForm === 'sign-up'"
            v-model="state.repeatPassword"
            placeholder="Repeat password"
            type="password">

        <span
            class="alert-filed"
            v-if="v$.repeatPassword.$error && typeForm === 'sign-up'">
            {{v$.repeatPassword.$errors[0].$message}}
        </span>

        <button
            class="form-auth__button"
            type="submit">
            {{ typeForm == "sign-up" ? "Sign Up" : "Sign In" }}
        </button>
    </form>
</template>
