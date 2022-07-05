<script lang="ts" setup>
    import { useGetUsers } from '../composables/useGetUsers'
    import CardUser from '../components/CardUser.vue'
    import CardUserSkeleton from '../components/skeleton/CardUserSkeleton.vue'
    const { loading, users, error } = useGetUsers()
</script>
<template>
    <p v-if="error" >{{error}}</p>
    <main v-else class="container">
        <div v-if="loading" class="container-links-section">
            <CardUserSkeleton v-for="(item, index) in 10" :key="index" />
        </div>
        <section v-else >
            <h2 v-if="users.length < 1">No user yet</h2>
            <div v-else class="container-links-section">
                <CardUser
                    v-for="item in users"
                    :key="item.id"
                    :principalAccount="item.principalAccount"
                    :nickName="item.nickName"
                    :avatar_url="item.avatar_url"
                    :fullName="item.fullName"
                />
            </div>
        </section>
    </main>
</template>
