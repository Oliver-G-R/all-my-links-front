<script lang="ts" setup>
    import { useStore } from 'vuex'
    import { IState } from '../store/index'
    import { computed, ref } from 'vue'
    import defaultProfileImage from '../assets/user.png'
    import { IStateFieldsUser } from '../models/Auth/User'
    import { updateProfile } from '../services/User'

    const store = useStore<IState>()
    const dataOwner = computed(() => store.state.user.profileOwnerUser)
    const errorFieldSelected = ref('')
    const errorResponse = ref('')
    const imagePreview = ref<null | string>(null)
    const showNickName = computed(() => dataOwner.value.nickName)

    const fieldsProfile = computed<IStateFieldsUser>(() => ({
        nickName: dataOwner.value.nickName,
        email: dataOwner.value.email,
        avatar_url: dataOwner.value.avatar_url
    }))

    // TODO: Cargar el servicio para la imagen de perfil y refactorizar esta parte en un composable

    const profileImageChange = (e: Event) => {
        const target = e.target as HTMLInputElement
        const fileList = target.files as FileList
        const uniqueFile = fileList[0]
        const allowedExtensions = ['image/jpeg', 'image/png']

        if (uniqueFile && allowedExtensions.includes(uniqueFile.type)) {
            errorFieldSelected.value = ''
            const reader = new FileReader()
            reader.onloadend = () => {
                imagePreview.value = reader.result as string
            }
            reader.readAsDataURL(uniqueFile)
        } else {
            errorFieldSelected.value = 'Error file, please select other'
        }
    }

    const updateProfileHandler = async () => {
        const response = await updateProfile(fieldsProfile.value)
        if (response.message) {
            errorResponse.value = typeof response.message === 'string'
                    ? response.message
                    : response.message[0]
                    console.log(response)
        } else {
            store.commit('user/setOwnerProfileUser', response)
        }
    }
</script>
<template>
    <main class="container">
        <h1 class="profile-edit__title">
            Profile {{showNickName}}
        </h1>
        {{errorResponse}}
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
                <span>Editar</span>
                <input
                    @change="profileImageChange"
                    type="file"
                    id="avatar-file-photo">
            </label>
            <span v-if="errorFieldSelected" >{{errorFieldSelected}}</span>
            <form @submit.prevent="updateProfileHandler">
                <input
                    placeholder="Nick Name"
                    v-model="fieldsProfile.nickName"
                    type="text">
                <input
                    placeholder="Email"
                    v-model="fieldsProfile.email"
                    type="email">
                <button>Save</button>
            </form>
        </section>
    </main>
</template>
