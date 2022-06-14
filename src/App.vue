<script setup lang="ts">
  import { onMounted, computed, watch } from 'vue'
  import { useStore } from 'vuex'
  import HeaderNav from './components/HeaderNav.vue'
  import { IState } from './store/index'
  const store = useStore<IState>()
  const token = computed(() => store.state.auth.user.token)

  onMounted(() => {
    store.dispatch('auth/getToken')
  })

  watch(() => token.value, (newValue) => {
    newValue && store.dispatch('user/getOwnerProfileUser', newValue)
  })

</script>

<template>
  <HeaderNav/>
  <router-view></router-view>
</template>

<style src="./sass/main.scss"></style>
