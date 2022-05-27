<script lang="ts" setup>
    interface Props{
        message: string
    }

    interface Emit{
        (e: 'closeAlert', err: string): void
    }

    const emit = defineEmits<Emit>()
    const props = defineProps<Props>()
</script>

<template>
    <div class="alert">
        <p class="alert__title">
            {{ props.message  }}
        </p>
        <button
            class="alert__close-btn"
            @click="() => emit('closeAlert', '')">
            x
        </button>
    </div>
</template>
