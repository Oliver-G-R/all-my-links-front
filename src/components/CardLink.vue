<script lang="ts" setup>
    import { social } from '../social'
    import { computed } from 'vue'

    const props = defineProps<{
        titleLink: string
        link : string
        socialIcon: string
    }>()

    const getSocialIcon = computed(() => social.find(icon => icon.name === props.socialIcon))

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
    </article>
</template>
