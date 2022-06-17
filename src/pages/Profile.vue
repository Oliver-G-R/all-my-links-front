<script lang="ts" setup>
    import { computed, ref } from 'vue'
    import { useStore } from 'vuex'
    import { IState } from '../store/index'
    import CardLink from '../components/CardLink.vue'
    import { useGetUserByUrl } from '../composables/useGetUserByUrl'
    import Modal from '../components/Modal.vue'
    const store = useStore<IState>()
    const userIdWithSession = computed(() => store.state.auth.user.id)
    const activeModalAddLinks = ref(false)

    const { user, loading } = useGetUserByUrl()

    const activModal = () => {
        activeModalAddLinks.value = !activeModalAddLinks.value
        document.querySelector('body')?.classList.toggle('modal-open')
    }

    const isOwner = computed(() => {
        return userIdWithSession.value === user.value?.id
    })
</script>

<template>
    <main>
        <p v-if="loading" > loading </p>
        <p v-else-if="!loading && !user" >
            No user found
        </p>

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
                        @click="activModal"
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

        <section v-if="user?.links" class="container section-profile-links">
            <CardLink
                v-for="item in user.links" :key="item.id"
                :titleLink = "item.titleLink"
                :link = "item.link"
            />
        </section>

        <Modal
            v-if="activeModalAddLinks"
            :activModal="activModal"
            title="Add new social link">
            BODY
        </Modal>

    </main>
</template>
