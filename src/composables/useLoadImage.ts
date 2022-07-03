import { ref } from 'vue'

const allowedExtensions = ['image/jpeg', 'image/png']

export const useLoadImage = () => {
    const errorImageSelected = ref('')
    const uploadFileImage = ref<File | null>()
    const imagePreview = ref<null | string>(null)

    const profileImageChange = (e: Event) => {
        const target = e.target as HTMLInputElement
        const fileList = target.files as FileList
        const uniqueFile = fileList[0]

        if (uniqueFile && allowedExtensions.includes(uniqueFile.type)) {
            errorImageSelected.value = ''
            const reader = new FileReader()
            uploadFileImage.value = uniqueFile
            reader.onloadend = () => {
                imagePreview.value = reader.result as string
            }
            reader.readAsDataURL(uniqueFile)
        } else {
            errorImageSelected.value = 'Error file, please select other'
        }
    }

    return {
        errorImageSelected,
        uploadFileImage,
        imagePreview,
        profileImageChange
    }
}
