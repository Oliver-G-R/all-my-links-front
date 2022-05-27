<script  lang="ts" setup>
    import { reactive } from 'vue'

    const props = defineProps({
        typeForm: {
            type: String,
            default: 'login'
        }
    })

    const initialData = {
        email: '',
        password: '',
        name: '',
        nickNameOrEmail: ''
    }

    const inputData = reactive(initialData)

    const handleSubmit = () => {
    }

</script>

<template>
    <form class="form-auth" @submit.prevent="handleSubmit">
        <input
            v-if="props.typeForm === 'sign-in'"
            class="form-auth__input"
            v-model="inputData.nickNameOrEmail"
            placeholder="Nick Name or email"
            type="text">
        <input
            v-if="props.typeForm === 'sign-up'"
            class="form-auth__input"
            v-model="inputData.name"
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
