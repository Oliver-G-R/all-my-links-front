<script lang="ts" setup>
    const props = defineProps<{
        titleLink: string
        link : string
    }>()
</script>
<template>
    <article class="card-link">
            <h2>{{props.titleLink}}</h2>
            <a :href="props.link" target="_blank">{{props.link}}</a>
    </article>
</template>
