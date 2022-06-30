<script lang="ts" setup>
    const props = defineProps<{
        position?: 'center'
        size?: 'small' | 'medium' | 'large'
    }>()
</script>
<template>
    <div
        :class="['lds-ring', {
            'lds-ring--center': props.position === 'center',
            'lds-ring--small': props.size === 'small',
            'lds-ring--large': props.size === 'large',
        }]"
        ><div></div><div></div><div></div><div></div></div>
</template>
