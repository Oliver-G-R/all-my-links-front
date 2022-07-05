<script lang="ts" setup>
    import { computed, ref, reactive } from 'vue'
    import { useStore } from 'vuex'
    import { IState } from '../store/index'

    import defaultProfileImage from '../assets/user.png'

    import { useGetUserByUrl } from '../composables/useGetUserByUrl'

    import CardLink from '../components/CardLink.vue'
    import Modal from '../components/Modal.vue'
    import FormLinks from '../components/FormLinks.vue'
    import { Ilinks } from '../models/Auth/User'
    import Alert from '../components/Alert.vue'
    import HandlerCardLink from '../components/HandlerCardLink.vue'
    import Loader from '../components/Loader.vue'
    import { ResponseTypeAlert } from '../models/Alert'
    import ProfileNamesUser from '../components/skeleton/ProfileNamesUser.vue'

    const store = useStore<IState>()
    const userIdWithSession = computed(() => store.state.auth.user.id)
    const activeModal = ref(false)
    const actionTypeModal = ref<'update' | 'save'>('save')
    const currentLinkToUpdate = reactive<Partial<Ilinks>>({})
    const responseActionAlert = ref<ResponseTypeAlert>({
        message: null,
        type: 'Info'
    })
    const loadingAction = ref(false)

    const ownerUser = computed(() => store.state.user.profileOwnerUser)

    const { user: userPublic, loading, error: errorResponse } = useGetUserByUrl()
    const isOwner = computed(() => userIdWithSession.value === userPublic.value?.id)
    const user = computed(() => isOwner.value ? ownerUser.value : userPublic.value)

    const toggleModal = (typeAction?: 'update' | 'save') => {
        activeModal.value = !activeModal.value
        if (typeAction) actionTypeModal.value = typeAction
        document.querySelector('body')?.classList.toggle('modal-open')
    }

</script>

<template>
    <p v-if="errorResponse">{{errorResponse}}</p>
    <main v-else>
        <Loader
            position="center"
            size="large"
            v-if="loadingAction" />
        <Alert
            @setStateAlert="responseActionAlert.message = $event"
            :message="responseActionAlert.message"
            :type="responseActionAlert.type"
        />
       <!--  <p v-if="loading" > loading </p>
        <p v-if="!user && !errorResponse && !loading" >
            No user found
        </p> -->
        <section
            class="section-profile"
            >
           <div class="section-profile__container">
                <div class="section-profile__content">
                    <ProfileNamesUser v-if="loading" />
                    <template v-else>
                        <div class="section-profile__container-avatar">
                            <img
                                :src="user?.avatar_url || defaultProfileImage"
                                alt="avatar">
                        </div>
                        <h1 >{{user?.fullName}}</h1>
                        <span>{{user?.nickName}}</span>
                   </template>
                </div>

                <div class="section-profile__content-btns">
                    <button
                        v-if="isOwner"
                        @click="toggleModal('save')"
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

        <section v-if="loading" class="container section-profile-links" >
             <div  class="section-profile-links__content">
                <article v-for="(_, index) in 8" :key="index" class="card-link skeleton-card-user__link-card"></article>
            </div>
        </section>
        <section v-else-if="user?.links" class="container section-profile-links">
            <h2 v-if="user.principalAccount">
                Principal Account
            </h2>

            <div class="section-profile-links__content">
                <CardLink
                    v-for="item in user.links"
                    v-bind="item"
                    :key="item.id"
                    :currentPrincippalAccount="user.principalAccount"
                >
                    <HandlerCardLink
                        :titleLink="item.titleLink"
                        :link="item.link"
                        :socialIcon="item.socialIcon"
                        :id="item.id"
                        :isOwner="isOwner"
                        :currentPrincippalAccount="user.principalAccount"
                        :toggleModal="toggleModal"
                        @setLinkToUpdate="currentLinkToUpdate = $event"
                        @setStateAlert="responseActionAlert = $event"
                        @setLoading="loadingAction = $event"
                    />
                </CardLink>
            </div>
        </section>

        <Modal
            v-if="activeModal"
            :toggleModal="toggleModal"
            :title="actionTypeModal === 'save' ? 'Add new social link' : 'Update social link'">
            <FormLinks
                v-if="actionTypeModal === 'save'"
                @setStateAlert="responseActionAlert = $event"
                :toggleModal="toggleModal" />
            <FormLinks
                v-else
                @setStateAlert="responseActionAlert = $event"
                :toggleModal="toggleModal"
                :link="(currentLinkToUpdate as Ilinks)"
            />
        </Modal>
    </main>
</template>
