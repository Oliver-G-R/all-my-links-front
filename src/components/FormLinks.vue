<script lang="ts" setup>
    import { social } from '../social'
    import { updateLink, createNewLink } from '../services/Links'
    import { reactive, ref, onMounted, computed } from 'vue'
    import { useStore } from 'vuex'
    import useValidate from '@vuelidate/core'
    import { rulesValidateLinks } from '../helpers/validates'
    import { Ilinks } from '../models/Auth/User'
    import { getError } from '../helpers/errors'
    import { IState } from '../store/index'
    import { ResponseTypeAlert } from '../models/Alert'

    const store = useStore<IState>()
    const props = defineProps<{
        toggleModal: Function,
        link?:Ilinks
    }>()
    const emits = defineEmits<{
        (e: 'setStateAlert', stAlert: ResponseTypeAlert): void,
    }>()
    const loading = ref(false)
    const currentPrincippalAccount = computed(() => store.state.user.profileOwnerUser.principalAccount)

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
        loading.value = true
        const response = await updateLink({
            ...socialIconValues,
            socialIcon: socialIcon.value
        }, props.link?.id as string)
        loading.value = false

        if (!response.message) {
            store.commit('user/updateLinks', response)
            currentPrincippalAccount.value?.id === response.id &&
                store.commit('user/setPrincipalAccount', response)

            emits('setStateAlert', {
                message: 'Link has been updated',
                type: 'Success'
            })
        } else {
            emits('setStateAlert', {
                message: getError(response.message),
                type: 'Error'
            })
        }
        props.toggleModal()
    }

    const save = async () => {
        loading.value = true
        const response = await createNewLink({
            ...socialIconValues,
            socialIcon: socialIcon.value
        })
        loading.value = false

        if (response?.id) {
            store.commit('user/setLinksUser', response)
            emits('setStateAlert', {
                message: 'Link has been created',
                type: 'Success'
            })
        } else {
            emits('setStateAlert', {
                message: getError(response.message),
                type: 'Error'
            })
        }

        props.toggleModal()
    }
</script>
<template>
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
        <button class="form-links__btn-save">
            {{loading ? 'loading...' : props.link ?  "Update" : "Save"}}
        </button>

    </form>
</template>
