<script lang="ts" setup>
    import { useStore } from 'vuex'
    import { computed } from 'vue'
    const store = useStore()

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
            </ul>
        </nav>
    </header>
</template>
