<script lang="ts" setup>
    import { getError } from '../helpers/errors'
    import { AlertState } from '../models/Alert'
    import { watch } from 'vue'

    interface Props{
        message: string | string[] | null,
        type: AlertState | null
    }

    const emits = defineEmits<{(e: 'setStateAlert', stAlert: null): void}>()

    const props = defineProps<Props>()

    watch(() => props.message, () => {
        setTimeout(() => {
            emits('setStateAlert', null)
        }, 4000)
    })
</script>

<template>
    <div :class="['alert', {
        'activ': props.message || '',
        'alert--success': props.type === 'Success',
        'alert--info': props.type === 'Info',
        'alert--danger': props.type === 'Error'
    }]">
        <p class="alert__title">
            {{
                props.message && getError(props.message)
            }}
        </p>
        <button
            class="alert__close-btn"
            @click="() => emits('setStateAlert', null)"
            >
            x
        </button>
    </div>
</template>
