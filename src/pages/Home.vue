<script lang="ts" setup>
    import { useGetUsers } from '../composables/useGetUsers'
import CardUser from '../components/CardUser.vue'
    const { loading, users, error } = useGetUsers()
</script>
<template>
    <p v-if="error" >{{error}}</p>
    <main v-else class="container">
        <p v-if="loading" >loading...</p>
        <section v-else>
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
