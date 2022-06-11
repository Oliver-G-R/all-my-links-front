<script setup lang="ts">
  import { onMounted } from 'vue'
  import { useStore } from 'vuex'

  import './sass/main.scss'
  import HeaderNav from './components/HeaderNav.vue'
  const store = useStore()

  onMounted(() => {
    store.dispatch('user/getToken')
  })
</script>

<template>
  <HeaderNav/>
  <router-view></router-view>
</template>
