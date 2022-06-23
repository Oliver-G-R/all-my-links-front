import { onMounted, ref, watch } from 'vue'
import { Iuser } from '../models/Auth/User'
import { getUserByNickName } from '../services/User'
import { useRoute } from 'vue-router'
import { getError } from '../helpers/errors'

export const useGetUserByUrl = () => {
    const user = ref<Iuser>()
    const loading = ref(true)
    const error = ref<string|null>(null)
    const route = useRoute()
    const routeNickName = ref(route.params.nickName.toString())

    const fetchUser = async () => {
        const userResponse = await getUserByNickName(routeNickName.value)
        loading.value = false
        console.log(userResponse.message)
        if (userResponse.nickName) {
            user.value = userResponse
        } else error.value = getError(userResponse.message)
    }

    onMounted(() => {
        fetchUser()
    })

    watch(() => route.params, (val) => {
        routeNickName.value = val.nickName as string
        fetchUser()
    })

    return {
        user,
        loading,
        error
    }
}
