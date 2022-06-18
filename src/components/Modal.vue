<script lang="ts" setup>
    const props = defineProps<{
        title: string,
        activModal: Function
    }>()

</script>
<template>
    <div class="modal__background-modal">
        <div class="modal__container-modal">
            <header class="modal__header">
                <h2>{{props.title}}</h2>
                <button class="modal__btn-close" @click="props.activModal()">Close</button>
            </header>
            <div class="moda__body">
                <slot/>
            </div>
        </div>
    </div>
</template>
