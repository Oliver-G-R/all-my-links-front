<script lang="ts" setup>
    import { ref } from 'vue'
    import { useStore } from 'vuex'
    import { IState } from '../store/index'

    import { createPrincipalAccount, deletePrincipalAccount, removeLink } from '../services/Links'
    import { catchError } from '../helpers/errors'
    import { Ilink } from '../models/Auth/User'
    import { ResponseTypeAlert } from '../models/Alert'

    const store = useStore<IState>()

    const props = defineProps<{
        titleLink: string
        link : string
        socialIcon: string
        id: string,
        isOwner: boolean
        toggleModal:(typeModalAction?: 'save' | 'update') => void,
        currentPrincippalAccount: Ilink | null
    }>()

    const emits = defineEmits<{
        (e: 'setLinkToUpdate', link:Ilink): void,
        (e: 'setStateAlert', stAlert: ResponseTypeAlert): void,
        (e: 'setLoading', load:boolean): void,
    }>()

    const listActions = ref<HTMLElement>()

    const updateLink = () => {
        props.toggleModal('update')
        listActions.value?.classList.toggle('activ')
        emits('setLinkToUpdate', {
            link: props.link,
            id: props.id,
            titleLink: props.titleLink,
            socialIcon: props.socialIcon
        })
    }

    const removeLinkHandler = async () => {
        emits('setLoading', true)
        const response = await removeLink(props.id)
        emits('setLoading', false)
        if (!response.error) {
            store.commit('user/removeLink', props.id)
            listActions.value?.classList.toggle('activ')
             props.currentPrincippalAccount?.id === props.id &&
                store.commit('user/setPrincipalAccount', null)
        } else {
            emits('setStateAlert', {
                message: 'Error to remove link',
                type: 'Error'
            })
        }
    }

    const setPrincipalAccount = async () => {
        const response = await createPrincipalAccount(props.id)
        emits('setLoading', false)
        if (response.data) {
            store.commit('user/setPrincipalAccount', response.data)
            listActions.value?.classList.toggle('activ')
        } else {
            emits('setStateAlert', {
                message: catchError(response.error).message,
                type: 'Error'
            })
        }
    }

    const removePrincipalAccount = async () => {
        const response = await deletePrincipalAccount(props.id)
        emits('setLoading', false)
        if (!response.error) {
            store.commit('user/setPrincipalAccount', null)
            listActions.value?.classList.toggle('activ')
        } else {
            emits('setStateAlert', {
                message: catchError(response.error).message,
                type: 'Error'
            })
        }
    }

    const handlerPrincipalAccount = () => {
        emits('setLoading', true)

        if (props.currentPrincippalAccount?.id === props.id) {
            removePrincipalAccount()
        } else {
            setPrincipalAccount()
        }
    }

    const copyLink = () => {
        navigator.clipboard.writeText(props.link)
        listActions.value?.classList.toggle('activ')
    }
</script>
<template>
        <button @click="listActions?.classList.toggle('activ')" >...</button>
        <ul
            ref="listActions"
            class="card-link__list-actions">
            <li v-if="isOwner">
                <button @click="removeLinkHandler" >Remove</button>
            </li>
            <li v-if="isOwner">
                <button @click="updateLink">Update</button>
            </li>
            <li v-if="isOwner">
                <button @click="handlerPrincipalAccount">
                    {{ props.currentPrincippalAccount?.id === props.id ? 'Remove principal account' : 'Set principal account' }}
                </button>
            </li>
            <li>
                <button @click="copyLink">Copy Link</button>
            </li>
        </ul>
</template>
