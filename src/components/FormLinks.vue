<script lang="ts" setup>
    import { social } from '../social'
    import { updateLink, createNewLink } from '../services/Links'
    import { reactive, ref, onMounted } from 'vue'
    import { useStore } from 'vuex'
    import useValidate from '@vuelidate/core'
    import { rulesValidateLinks } from '../helpers/validates'
    import { Ilinks } from '../models/Auth/User'
    import { getError } from '../helpers/errors'
    import Alert from './Alert.vue'

    const store = useStore()
    const props = defineProps<{
        toggleModal: Function,
        link?:Ilinks
    }>()

    const error = ref<string | null>(null)
    const socialIcon = ref()
    const socialIconValues = reactive<{
        link: string
        titleLink: string
    }>({
        link: '',
        titleLink: ''
    })

    onMounted(() => {
        if (props.link) {
            socialIconValues.link = props.link.link
            socialIconValues.titleLink = props.link.titleLink
            socialIcon.value = props.link.socialIcon
        }
    })

    const v$ = useValidate(rulesValidateLinks, socialIconValues)

    const handdleAction = async () => {
        v$.value.$validate()
        if (!v$.value.$error && socialIcon.value) {
            if (!props.link) {
                save()
            } else {
                update()
            }
         }
    }

    const update = async () => {
        const response = await updateLink({
            ...socialIconValues,
            socialIcon: socialIcon.value
        }, props.link?.id as string)

        if (response?.id) {
            store.commit('user/updateLinks', response)
            props.toggleModal()
        } else {
            error.value = getError(response.message)
        }
    }

    const save = async () => {
        const response = await createNewLink({
            ...socialIconValues,
            socialIcon: socialIcon.value
        })

        if (response?.id) {
            store.commit('user/setLinksUser', response)
            props.toggleModal()
        } else {
            error.value = getError(response.message)
        }
    }
</script>
<template>
    <Alert
        :message="error"
        @set-error="error = $event"
    />
    <form @submit.prevent="handdleAction" class="form-links">
        <input
            v-model="socialIconValues.titleLink"
            class="form-links__input"
            type="text"
            placeholder="Title">
        <span
            class="alert-filed"
            v-if="v$.titleLink.$error">
            {{v$.titleLink.$errors[0].$message}}
        </span>
        <input
            v-model="socialIconValues.link"
            class="form-links__input form-links__input--link"
            type="text"
            placeholder="Link">

        <span
            class="alert-filed"
            v-if="v$.link.$error">
            {{v$.link.$errors[0].$message}}
        </span>

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

        <button class="form-links__btn-save">{{props.link ?  "Update" : "Save"}}</button>

    </form>
</template>
