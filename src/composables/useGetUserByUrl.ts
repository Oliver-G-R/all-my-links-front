import { ref, watch, onMounted } from 'vue'
import { Iuser } from '../models/Auth/User'
import { getUserByNickName } from '../services/User'
import { useRoute } from 'vue-router'
import { getError } from '../helpers/errors'

export const useGetUserByUrl = () => {
    const user = ref<Iuser>()
    const loading = ref(true)
    const error = ref<string|null>(null)
    const route = useRoute()

    const fetchUser = async (nickName:string) => {
        const userResponse = await getUserByNickName(nickName)
        loading.value = false
        if (userResponse.nickName && nickName) {
            user.value = userResponse
            error.value = null
        } else error.value = getError(userResponse.message)
    }

    watch(() => route.params.nickName, (nickName) => {
        nickName && fetchUser(nickName.toString())
    })

    onMounted(() => {
        route.params.nickName && fetchUser(route.params.nickName.toString())
    })

    return {
        user,
        loading,
        error
    }
}
