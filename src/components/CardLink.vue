<script lang="ts" setup>
    import { social } from '../social'
    import { computed, ref } from 'vue'
    import { Ilinks } from '../models/Auth/User'
    import { removeLink } from '../services/Links'
    import { store } from '../store/index'

    const listActions = ref<HTMLElement>()
    const emits = defineEmits<{
        (e: 'setLinkToUpdate', link:Ilinks): void,
        (e: 'setError', err:string | null): void
    }>()

    const props = defineProps<{
        titleLink: string
        link : string
        socialIcon: string
        id: string,
        isOwner: boolean
        toggleModal:(typeModalAction?: 'save' | 'update') => void
    }>()

    const getSocialIcon = computed(() => social.find(icon => icon.name === props.socialIcon))

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
        const response = await removeLink(props.id)
        if (!response.message) {
            store.commit('user/removeLink', props.id)
            listActions.value?.classList.toggle('activ')
        } else {
            emits('setError', response.message)
        }
    }

    const copyLink = (url:string) => {
        navigator.clipboard.writeText(url)
        listActions.value?.classList.toggle('activ')
    }
</script>
<template>
    <article class="card-link">
            <img
                :src="getSocialIcon?.icon"
                :alt="getSocialIcon?.name">
            <div class="card-link__content-link">
                <h2>{{props.titleLink}}</h2>
                <a
                    :href="props.link"
                    target="_blank">{{props.link}}</a>
            </div>
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
                <li>
                    <button @click="copyLink(props.link)">Copy Link</button>
                </li>
            </ul>
    </article>
</template>
