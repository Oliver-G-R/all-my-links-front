import { useStore } from 'vuex'
import { IState } from '../store/index'
import { onMounted, toRefs, ref } from 'vue'
import { catchError, getError } from '../helpers/errors'

export const useGetUsers = () => {
    const store = useStore<IState>()
    const loading = ref(true)
    const error = ref<string | null>(null)
    const { id } = toRefs(store.state.auth.user)
    const { users } = toRefs(store.state.user.globalUsers)

    onMounted(async () => {
        try {
            await store.dispatch('user/getUsers', id?.value)
        } catch (e) {
            error.value = getError(catchError(e).message)
        }
        loading.value = false
    })

    return {
        loading,
        users,
        error
    }
}
