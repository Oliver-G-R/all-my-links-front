<script lang="ts" setup>
  import { computed } from 'vue'
  import { useStore } from 'vuex'
  import { IState } from '../../store/index'

  const store = useStore<IState>()
  const user = computed(() => store.state.user.profileOwnerUser)
  const emit = defineEmits<{
    (e: 'toggleModalProfile', toggle: boolean): void,
  }>()

  const logout = () => {
    store.dispatch('auth/logout')
    store.commit('user/setOwnerProfileUser', {})
    emit('toggleModalProfile', false)
  }
</script>

<template>
  <div class="profile-modal">
    <header class="profile-modal__header">
      <router-link @click="emit('toggleModalProfile', false)" :to="{
          name: 'profile',
          params: {
            nickName: user.nickName,
          },
        }">
        <h3 class="profile-modal__fullName">{{user.fullName}}</h3>
        <p class="profile-modal__nickName">{{user.nickName}}</p>
      </router-link>
    </header>
    <ul class="profile-modal__list">
      <li @click="emit('toggleModalProfile', false)" class="profile-modal__item">
        <router-link :to="{
          name: 'profile-edit',
        }">
          <p>Settings</p>

        </router-link>
      </li>
      <li class="profile-modal__item" @click="logout"><button>Log Out</button></li>
    </ul>
  </div>
</template>
