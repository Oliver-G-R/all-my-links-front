<script lang="ts" setup>
    import { social } from '../social'
    import { createNewLink } from '../services/User'
    import { reactive, ref } from 'vue'
    import { useStore } from 'vuex'
    import { IstateLinks } from '../models/Auth/User'
    const store = useStore()

    const props = defineProps<{
        closeModal: Function
    }>()
    const error = ref('')
    const socialIcon = ref()
    const socialIconValues = reactive<IstateLinks>({
        link: '',
        socialIcon: '',
        titleLink: ''
    })

    const save = async () => {
        const response = await createNewLink({
            ...socialIconValues,
            socialIcon: socialIcon.value
        })

        if (response.id) {
            store.commit('user/setLinksUser', response)
            props.closeModal()
        } else {
            error.value = typeof response.message === 'string'
                ? response.message
                : response.message[0]
        }
    }
</script>
<template>
    <form @submit.prevent="save" class="form-links">
        {{error}}
        <input
            v-model="socialIconValues.titleLink"
            class="form-links__input"
            type="text"
            placeholder="Title">
        <input
            v-model="socialIconValues.link"
            class="form-links__input form-links__input--link"
            type="text"
            placeholder="Link">

        <div class="form-links__container-social-icons">
            <img
                v-for="(item, index) in social" :key="index" :src="item.icon"
                :alt="item.name"
                @click="socialIcon = item.name"
                :class="{
                    'activ': socialIcon === item.name
                }"
                >
        </div>

        <button class="form-links__btn-save">Save</button>

    </form>
</template>
