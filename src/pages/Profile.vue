<script lang="ts" setup>
    import { computed } from 'vue'
    import { useStore } from 'vuex'
    import { IState } from '../store/index'
    import { useGetUserByUrl } from '../composables/useGetUserByUrl'

    const store = useStore<IState>()
    const userIdWithSession = computed(() => store.state.auth.user.id)

    const { user, loading } = useGetUserByUrl()

    const isOwner = computed(() => {
        return userIdWithSession.value === user.value?.id
    })
</script>

<template>
    <main>
        <p v-if="loading" > loading </p>

        <section
            class="section-profile"
            v-if="user && !loading">
           <div class="section-profile__container">
                <div class="section-profile__content">
                    <div class="section-profile__container-avatar">
                        <img
                            v-if="user.avatar_url"
                            :src="user.avatar_url"
                            alt="avatar">
                        <span v-else> {{user.nickName[0]}} </span>
                    </div>
                    <h1>{{user.nickName}}</h1>
                </div>

                <div class="section-profile__content-btns">
                    <button
                        v-if="isOwner"
                        class="section-profile__btn-profile section-profile__btn-profile--add" >
                        +
                    </button>
                    <router-link
                        v-if="isOwner"
                        class="section-profile__btn-profile"
                        to="/settings/profile">Update Profile</router-link>
                    <button
                        class="section-profile__btn-profile">
                        Share profile
                    </button>
                </div>
           </div>
        </section>

        <p v-else>
            No user found
        </p>

    </main>
</template>
