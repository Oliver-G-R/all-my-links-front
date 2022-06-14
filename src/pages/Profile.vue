<script lang="ts" setup>
    import { ref, computed, watch } from 'vue'
    import { useStore } from 'vuex'
    import { IState } from '../store/index'
    import { useGetUserByUrl } from '../composables/useGetUserByUrl'

    const store = useStore<IState>()

    const isOwner = ref(false)

    const { user, loading } = useGetUserByUrl()

    const userIdWithSession = computed(() => store.state.auth.user.id)

    watch(() => user.value?.id, (newValue) => {
        if (newValue === userIdWithSession.value) { isOwner.value = true }
    })
</script>
<template>
    <main class="container">

        <p v-if="loading" > loading </p>

        <section v-if="user && !loading">
            <h1>Profile {{user.nickName}}</h1>
            <router-link v-if="isOwner" to="/settings/profile">Editar perfil</router-link>
            <ul>
                <li v-for="link in user.links" :key="link.id">
                    {{link.titleLink}} - <a target="_blank" :href="link.link">{{link.link}}</a>
                </li>
            </ul>
        </section>

        <p v-else>
            No user found
        </p>
    </main>
</template>
