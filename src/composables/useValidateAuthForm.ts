import useValidate from '@vuelidate/core'
import { required, email, helpers, sameAs, maxLength, minLength } from '@vuelidate/validators'
import { IinputData } from '../models/FormAuth/index'
import { computed } from 'vue'
export const useValidateAuthForm = (state: IinputData) => {
    const nickNameRegex = helpers.regex(/^[a-z0-9_.]+$/)

    const rules = computed(() => ({
        nickName: {
            required: helpers.withMessage('This nickName is required', required),
            nickNameRegex: helpers.withMessage('The nick name must have only lowercase letters and numbers ', nickNameRegex)
        },
        nickNameOrEmail: {
            required: helpers.withMessage('This nickNameOrEmail is required', required)
        },
        email: {
            required: helpers.withMessage('This email is required', required),
            email: helpers.withMessage('This mail is not valid', email)

        },
        password: {
            required: helpers.withMessage('This password is required', required),
            maxLength: helpers.withMessage('The password must be at least 20 characters', maxLength(20)),
            minLength: helpers.withMessage('The password must be at least 8 characters', minLength(8))
        },
        repeatPassword: {
            required: helpers.withMessage('This repeatPassword is required', required),
            sameAs: helpers.withMessage('The passwords must be the same', sameAs(state.password))
        }
    }))

    const v$ = useValidate(rules, state)

    return {
        state,
        v$
    }
}
