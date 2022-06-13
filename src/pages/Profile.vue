<script lang="ts" setup>
    import { useRoute } from 'vue-router'
    import { getUserByNickName } from '../services/User'
    import { Iuser } from '../models/Auth/User'
    import { ref, onMounted } from 'vue'

    const user = ref<Iuser>()
    const route = useRoute()
    const loading = ref(true)

    const routeNickName = route.params.nickName

    const fetchUser = async () => {
        const userResponse = await getUserByNickName(routeNickName as string)
        loading.value = false
        if (!userResponse.message) {
            user.value = userResponse
        }
    }

    onMounted(() => {
        fetchUser()
    })
</script>
<template>
    <main class="container">

        <p v-if="loading" > loading </p>

        <section v-if="user && !loading">
            <h1>Profile {{user.nickName}}</h1>
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
