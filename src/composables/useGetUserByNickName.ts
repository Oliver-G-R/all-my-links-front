import { onMounted, ref } from 'vue'
import { Iuser } from '../models/Auth/User'
import { getUserByNickName } from '../services/User'

export const useGetUserByNickName = (nickName: string) => {
    const user = ref<Iuser>()
    const loading = ref(true)

    const fetchUser = async () => {
        const userResponse = await getUserByNickName(nickName as string)
        loading.value = false

        if (!userResponse.message) {
            user.value = userResponse
        }
    }
    onMounted(() => {
        fetchUser()
    })

    return {
        user,
        loading
    }
}
