import { onMounted, ref, watch } from 'vue'
import { Iuser } from '../models/Auth/User'
import { getUserByNickName } from '../services/User'
import { useRoute } from 'vue-router'

export const useGetUserByUrl = () => {
    const user = ref<Iuser>()
    const loading = ref(true)

    const route = useRoute()
    const routeNickName = ref(route.params.nickName.toString())

    const fetchUser = async () => {
        const userResponse = await getUserByNickName(routeNickName.value)
        loading.value = false
        if (userResponse.nickName) {
            user.value = userResponse
        }
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
        loading
    }
}
