<script lang="ts" setup>
    import { useStore } from 'vuex'
    import { IState } from '../store/index'
    import { computed, ref } from 'vue'
    import defaultProfileImage from '../assets/user.png'
    import { IStateFieldsUser } from '../models/Auth/User'
    import { updateProfile, uploadAvatar } from '../services/User'
    import { getError } from '../helpers/errors'
    import { useLoadImage } from '../composables/useLoadImage'
import Alert from '../components/Alert.vue'

    const store = useStore<IState>()

    const errorUploadAvatar = ref('')
    const dataOwner = computed(() => store.state.user.profileOwnerUser)
    const errorResponse = ref<string| null>(null)
    const showNickName = computed(() => dataOwner.value.nickName)
    const loadingUploadImage = ref(false)

    const {
        errorFieldSelected,
        uploadFileImage,
        imagePreview,
        profileImageChange
    } = useLoadImage()

    const fieldsProfile = computed<IStateFieldsUser>(() => ({
        nickName: dataOwner.value.nickName,
        email: dataOwner.value.email,
        avatar_url: dataOwner.value.avatar_url,
        bio: dataOwner.value.bio,
        fullName: dataOwner.value.fullName
    }))

    const upAvatar = async () => {
        loadingUploadImage.value = true
        const formData = new FormData()
        formData.append('file', uploadFileImage.value as File)
        const response = await uploadAvatar(formData)
        loadingUploadImage.value = false
        if (response.message) {
            errorUploadAvatar.value = getError(response.message)
        } else {
            imagePreview.value = null
            uploadFileImage.value = null
            store.commit('user/setProfileAvatar', response.avatar_url)
        }
    }

    const updateProfileHandler = async () => {
        uploadFileImage.value && !errorFieldSelected.value && upAvatar()
        const response = await updateProfile(fieldsProfile.value)

        if (response.message) {
            errorResponse.value = getError(response.message)
        } else {
            store.commit('user/setOwnerProfileUser', response)
        }
    }
</script>
<template>
    <Alert
        :message="errorResponse"
        @set-error="errorResponse = $event"
    />
    <main class="container">
        <h1 class="profile-edit__title">
            Profile {{showNickName}}
        </h1>
        {{errorUploadAvatar}}
        <section class="profile-edit__section-data">

            <label for="avatar-file-photo" class="profile-edit__content-avatar section-profile__container-avatar">
                <img
                    v-if="!imagePreview"
                    :src="fieldsProfile.avatar_url || defaultProfileImage"
                    alt="">
                <img
                    v-else
                    :src="imagePreview && !errorFieldSelected
                        ? imagePreview
                        : fieldsProfile.avatar_url || defaultProfileImage ">
                <span v-if="!loadingUploadImage" >Editar</span>
                <span v-else>Cargando...</span>
                <input
                    @change="profileImageChange"
                    type="file"
                    id="avatar-file-photo">
            </label>
            <span v-if="errorFieldSelected" >{{errorFieldSelected}}</span>
            <form @submit.prevent="updateProfileHandler">
                <input
                    placeholder="Full Name"
                    v-model="fieldsProfile.fullName"
                    type="text">

                <input
                    placeholder="Nick Name"
                    v-model="fieldsProfile.nickName"
                    type="text">
                <input
                    placeholder="Email"
                    v-model="fieldsProfile.email"
                    type="email">

                <textarea
                    placeholder="Bio"
                    v-model="fieldsProfile.bio"
                    type="text">
                >

                </textarea>

                <button>Save</button>
            </form>
        </section>
    </main>
</template>
