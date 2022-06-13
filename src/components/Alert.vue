<script lang="ts" setup>
    import { IState } from '../store/index'
    import { useStore } from 'vuex'

    const store = useStore<IState>()

    interface Props{
        message: string | string[]
    }

    const props = defineProps<Props>()
</script>

<template>
    <div class="alert">
        <p class="alert__title">
            {{
                typeof props.message === 'string'
                    ? props.message
                    : props.message[0]
            }}
        </p>
        <button
            class="alert__close-btn"
            @click="() => store.commit('auth/setError', '')">
            x
        </button>
    </div>
</template>
