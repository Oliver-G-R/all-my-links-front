<script lang="ts" setup>
    import { social } from '../social'
    import { computed } from 'vue'
    import { Ilinks } from '../models/Auth/User'

    const props = defineProps<{
        titleLink: string
        link : string
        socialIcon: string
        id: string,
        currentPrincippalAccount?: Ilinks | null
    }>()

    const getSocialIcon = computed(() => social.find(icon => icon.name === props.socialIcon))

</script>
<template>
    <article  :class="['card-link', {
        'card-link--principal': currentPrincippalAccount?.id === props.id,
    }]">
            <img
                :src="getSocialIcon?.icon"
                :alt="getSocialIcon?.name">
            <div class="card-link__content-link">
                <h2>{{props.titleLink}}</h2>
                <a
                    :href="props.link"
                    target="_blank">{{props.link}}</a>
            </div>

            <slot/>

    </article>
</template>
