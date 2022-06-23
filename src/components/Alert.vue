<script lang="ts" setup>
    import { getError } from '../helpers/errors'

    interface Props{
        message: string | string[] | null
    }

    const emits = defineEmits<{(e: 'setError', err: string | null): void}>()

    const props = defineProps<Props>()
</script>

<template>
    <div :class="['alert', {
        'activ': props.message || ''
    }]">
        <p class="alert__title">
            {{
                props.message && getError(props.message)
            }}
        </p>
        <button
            class="alert__close-btn"
            @click="() => emits('setError', null)"
            >
            x
        </button>
    </div>
</template>
