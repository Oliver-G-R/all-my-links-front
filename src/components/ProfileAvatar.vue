<script lang="ts" setup>
    import defaultProfileImage from '../assets/user.png'
    const props = defineProps<{
      avatar_url:string,
      size?: 'small' | 'medium' | 'large'
    }>()

</script>
<template>
  <img
    :src="props.avatar_url || defaultProfileImage"
    :class="[props.size, 'profile-avatar']"
    alt="avatar" />
</template>
