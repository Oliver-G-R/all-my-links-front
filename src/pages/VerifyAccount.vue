<script lang="ts" setup>
  import { useRoute } from 'vue-router'
  import { onMounted, ref } from 'vue'
  import { expiredToke } from '../helpers/validToken'
  import { linksApi } from '../axios/index'
  import { useStore } from 'vuex'
  import { UserState } from '../store/user/state'
  import { catchError } from '../helpers/errors'
  import router from '../router/index.router'
import { TOKEN_USER } from '../constants/auth'
  const route = useRoute()
  const isVerify = ref(false)
  const error = ref('')
  const store = useStore<UserState>()

  onMounted(async () => {
    const token = route.query.token?.toLocaleString()
    try {
      if (!token) error.value = 'Waitin for token.... Please verify your email'
      else if (!expiredToke(token)) {
        isVerify.value = true
        const resp = await linksApi.get(`/auth/create-user-after-confirmation/${token}`)
        setTimeout(() => {
          store.commit('auth/setDataUser', {
            token: resp.data.token,
            isActive: true,
            id: resp.data.user.id
          })
          localStorage.setItem(TOKEN_USER, resp.data.token)
          router.push({ name: 'profile', params: { nickName: resp.data.user.nickName } })
        }, 2000)
      } else {
        error.value = 'Token is expired'
      }
    } catch (e) {
      error.value = catchError(e).message
    }
  })
</script>

<template>
  <main>
    <h1>
      Verify Account {{ isVerify ? "✅"  : "❌" }}
    </h1>

    {{error}}
  </main>

</template>

<style lang="scss" scoped>
main{
  display: grid;
  place-content: center;
  height: 80vh;

}
</style>
