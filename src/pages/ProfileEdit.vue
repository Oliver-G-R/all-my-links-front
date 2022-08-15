<script lang="ts" setup>
    import { useStore } from 'vuex'
    import { IState } from '../store/index'
    import { computed, ref } from 'vue'
    import defaultProfileImage from '../assets/user.png'
    import { IStateFieldsUser } from '../models/Auth/User'
    import { updateProfile, uploadAvatar } from '../services/User'
    import { catchError } from '../helpers/errors'
    import { useLoadImage } from '../composables/useLoadImage'
    import Alert from '../components/Alert.vue'
    import Loader from '../components/Loader.vue'
    import { ResponseTypeAlert } from '../models/Alert'

    const store = useStore<IState>()

    const errorUploadAvatar = ref<ResponseTypeAlert>({
        message: null,
        type: 'Info'
    })
    const errorResponse = ref<ResponseTypeAlert>({
        message: null,
        type: 'Info'
    })

    const dataOwner = computed(() => store.state.user.profileOwnerUser)
    const showFullName = computed(() => dataOwner.value.fullName)
    const loadingUploadImage = ref(false)
    const loadingProfileData = ref(false)

    const {
        errorImageSelected,
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
        if (response.error) {
            errorUploadAvatar.value = {
                message: response.error.message,
                type: 'Error'
            }
        } else if (response.data) {
            imagePreview.value = null
            uploadFileImage.value = null
            store.commit('user/setProfileAvatar', response.data.avatar_url)
            errorUploadAvatar.value = {
                message: 'Update avatar successfully',
                type: 'Success'
            }
        }
    }

    // TODO: VALIDAR QUE EL PROFILE COMPLETO NO SE ACTUALICE SI NO SE CAMBIA NADA
    const updateProfileHandler = async () => {
        loadingProfileData.value = true
        uploadFileImage.value && !errorImageSelected.value && upAvatar()
        const response = await updateProfile(fieldsProfile.value)
        loadingProfileData.value = false

        if (response.error) {
            errorResponse.value = {
                message: catchError(response.error).message,
                type: 'Error'
            }
        } else {
            store.commit('user/setOwnerProfileUser', response)
            errorResponse.value = {
                message: 'Update profile successfully',
                type: 'Success'
            }
        }
    }
</script>
<template>
    <Alert
        :message="errorResponse.message"
        @set-state-alert="errorResponse.message = $event"
        :type="errorResponse.type"
    />
    <Alert
        :message="errorUploadAvatar.message"
        @set-state-alert="errorUploadAvatar.message = $event"
        :type="errorUploadAvatar.type"
    />
    <main class="container">
        <section class="profile-edit profile-edit__avatar-content">
            <div>
                 <h1 class="profile-edit__fullName">
                     {{showFullName}}
                 </h1>
                 <p>Update your profile</p>
            </div>

            <label for="avatar-file-photo" class="profile-edit__content-avatar">
                <img
                    v-if="!imagePreview"
                    :src="fieldsProfile.avatar_url || defaultProfileImage"
                    alt="">
                <img
                    v-else
                    :src="imagePreview && !errorImageSelected
                        ? imagePreview
                        : fieldsProfile.avatar_url || defaultProfileImage ">
                <div v-if="loadingUploadImage" class="container-loader">
                    <Loader
                        size="small"
                    />
                </div>
                <input
                    @change="profileImageChange"
                    type="file"
                    id="avatar-file-photo">
            </label>
        </section>
       <section class="section-profile-form">
            <span v-if="errorImageSelected" >{{errorImageSelected}}</span>
            <form
                class="section-profile-form__form"
                @submit.prevent="updateProfileHandler">
               <div class="section-profile-form__names">
                    <input
                        class="section-profile-form__input section-profile-form__input--full-name"
                        placeholder="Full Name"
                        v-model="fieldsProfile.fullName"
                        type="text">

                    <input
                        class="section-profile-form__input"
                        placeholder="Nick Name"
                        v-model="fieldsProfile.nickName"
                        type="text">
               </div>
                <input
                    class="section-profile-form__input"
                    placeholder="Email"
                    v-model="fieldsProfile.email"
                    type="email">

                <textarea
                    class="section-profile-form__input section-profile-form__input--textarea"
                    placeholder="Bio"
                    v-model="fieldsProfile.bio"
                    type="text">
                >

                </textarea>

                <button
                    :disabled="loadingUploadImage || loadingProfileData"
                    class="section-profile-form__btn">
                        Save
                </button>
            </form>
       </section>
    </main>
</template>
