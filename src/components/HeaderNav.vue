<script lang="ts" setup>
    import { useStore } from 'vuex'
    import { computed } from 'vue'
    import { IState } from '../store/index'
    const store = useStore<IState>()

    const ownerUser = computed(() => store.state.user.profileOwnerUser)
    const isActivUser = computed(() => store.getters['auth/stateActivUser'])
</script>

<template>
    <header class="header">
        <nav class="header__nav container">
            <router-link class="header__logo" to="/">All my links</router-link>

            <ul class="header__list-nav">
                <li v-if="!isActivUser">
                    <router-link class="header__link" to="/signIn">Sign In</router-link>
                </li>
                <li v-if="!isActivUser">
                    <router-link class="header__link" to="/signUp">Sign Up</router-link>
                </li>
                <li v-if="isActivUser" >
                    <button @click="store.dispatch('auth/logout')">
                        Logout
                    </button>
                </li>
                <li v-if="isActivUser">
                    <router-link  to="/settings/profile">
                        <img  v-if="ownerUser.avatar_url" :src="ownerUser.avatar_url" alt="avatar">
                        <span v-else>{{ownerUser.nickName}}</span>
                    </router-link>
                </li>
            </ul>
        </nav>
    </header>
</template>

<style lang="scss" scoped>
   ul{
    display: flex;
    align-items: center;

    li  img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-right: 10px;
    }
   }
</style>
