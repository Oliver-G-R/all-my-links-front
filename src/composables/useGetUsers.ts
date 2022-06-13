import { useStore } from 'vuex'
import { IState } from '../store/index'
import { onMounted, toRefs } from 'vue'

export const useGetUsers = () => {
    const store = useStore<IState>()
    const { id } = toRefs(store.state.auth.user)
    const { loading, users } = toRefs(store.state.user.globalUsers)

    onMounted(() => {
        store.dispatch('user/getUsers', id?.value)
    })

    return {
        loading,
        users
    }
}
