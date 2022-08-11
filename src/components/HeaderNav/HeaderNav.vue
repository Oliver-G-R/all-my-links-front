<script lang="ts" setup>
    import { useStore } from 'vuex'
    import { computed, ref } from 'vue'
    import { IState } from '../../store/index'
    import ProfileAvatar from '../ProfileAvatar.vue'
    import ModalProfile from './ModalProfile.vue'

    const store = useStore<IState>()

    const ownerUser = computed(() => store.state.user.profileOwnerUser)
    const isActivUser = computed(() => store.getters['auth/stateActivUser'])
    const toggleModalProfile = ref(false)

</script>

<template>
    <header class="header-nav">
        <nav class="header-nav__nav container">
            <router-link class="header-nav__logo" to="/">All my links</router-link>

            <ul class="header-nav__list-nav">
                <li v-if="!isActivUser">
                    <router-link class="header-nav__link" to="/signIn">Sign In</router-link>
                </li>
                <li v-if="!isActivUser">
                    <router-link class="header-nav__link" to="/signUp">Sign Up</router-link>
                </li>
                <li
                    class="header-nav__content-profile"
                    v-if="isActivUser && ownerUser.nickName">
                    <div class="container">
                        <p
                            @click="toggleModalProfile = !toggleModalProfile"
                            class="header-nav__nickName">
                        {{ownerUser.nickName}}</p>

                        <ProfileAvatar
                            @click="toggleModalProfile = !toggleModalProfile" size="small"
                            :avatar_url="(ownerUser.avatar_url as string)" />
                    </div>
                    <ModalProfile @toggle-modal-profile="toggleModalProfile = $event" v-if="toggleModalProfile" />
                </li>
            </ul>
        </nav>
    </header>
</template>
