<script lang="ts" setup>
    import { useStore } from 'vuex'
    import { computed } from 'vue'
    import { IState } from '../store/index'
    import defaultProfileImage from '../assets/user.png'

    const store = useStore<IState>()

    const ownerUser = computed(() => store.state.user.profileOwnerUser)
    const isActivUser = computed(() => store.getters['auth/stateActivUser'])
    const logout = () => {
        store.dispatch('auth/logout')
        store.commit('user/setOwnerProfileUser', {})
    }
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
                    <button @click="logout">
                        Logout
                    </button>
                </li>
                <li v-if="isActivUser && ownerUser.nickName">
                    <router-link :to="{
                        name: 'profile',
                        params: {
                            nickName: ownerUser.nickName
                        }
                    }">
                        <img :src="ownerUser.avatar_url || defaultProfileImage" alt="avatar">
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
