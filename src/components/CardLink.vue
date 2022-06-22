<script lang="ts" setup>
    import { social } from '../social'
    import { computed, ref } from 'vue'
    import { Ilinks } from '../models/Auth/User'

    const listActions = ref<HTMLElement>()

    const emits = defineEmits<{(e: 'setLinkToUpdate', link:Ilinks): void}>()
    const props = defineProps<{
        titleLink: string
        link : string
        socialIcon: string
        id: string,
        toggleModal:(typeModalAction: 'save' | 'update') => void
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
</script>
<template>
    <article class="card-link">
            <img
                :src="getSocialIcon?.icon"
                :alt="getSocialIcon?.name">
            <div class="card-link__content-link">
                <h2>{{props.titleLink}}</h2>
                <a :href="props.link" target="_blank">{{props.link}}</a>
            </div>
            <button @click="listActions?.classList.toggle('activ')" >...</button>
            <ul
                ref="listActions"
                class="card-link__list-actions">
                <li>
                    <button>Remove</button>
                </li>
                <li>
                    <button @click="updateLink">Update</button>
                </li>
                <li>
                    <button>Copy Link</button>
                </li>
            </ul>
    </article>
</template>
