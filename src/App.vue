<script setup lang="ts">
  import { onMounted, computed } from 'vue'
  import { useStore } from 'vuex'

  import './sass/main.scss'
  import HeaderNav from './components/HeaderNav.vue'
  import { IState } from './store/index'
  const store = useStore<IState>()
  const token = computed(() => store.state.auth.user.token)
  onMounted(() => {
    store.dispatch('auth/getToken')
    if (token.value) {
        store.dispatch('user/getOwnerProfileUser', token.value)
    }
  })
</script>

<template>
  <HeaderNav/>
  <router-view></router-view>
</template>
