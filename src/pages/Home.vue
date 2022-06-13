<script lang="ts" setup>
   import { useGetUsers } from '../composables/useGetUsers'
   const { loading, users } = useGetUsers()
</script>
<template>
    <main class="container">
        <p v-if="loading" >loading...</p>
        <ul v-else style="
            display: flex;
            gap: 10px;
        ">
            <li v-for="user in users" :key="user.id">
                <router-link :to="{
                    name: 'profile',
                    params: {
                        nickName: user.nickName
                    }
                }"  >{{user.nickName}}</router-link>

                <div v-for="link in user.links" :key="link.id" >
                    {{
                        link.link
                    }}
                </div>
            </li>
        </ul>
    </main>
</template>
