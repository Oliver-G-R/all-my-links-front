<script lang="ts" setup>
  import { onMounted, ref } from 'vue'
  import { useConfirmAccount } from '../composables/useConfirmAccount'
  const { isVerify, resendEmail, tokenExpired, error, resendValid } = useConfirmAccount()
  const isDisableButton = ref(false)
  const refButtonResend = ref<HTMLButtonElement>()
  const stringTime = ref('')

  const handleResend = async () => {
    await resendEmail()

    isDisableButton.value = true
    localStorage.setItem('time', Date.now().toString())
    setTimeout(() => {
      isDisableButton.value = false
    }, 120000)
    intervalTime()
  }

  const intervalTime = () => {
    const getTimeInLocalStorage = localStorage.getItem('time')
    const interval = setInterval(() => {
      const time = Date.now() - parseInt(getTimeInLocalStorage as string)
      const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((time % (1000 * 60)) / 1000)
      stringTime.value = `${minutes}:${seconds}`

      if (time > 120000) {
        console.log('is mayor')
        stringTime.value = ''
        isDisableButton.value = false
        localStorage.removeItem('time')
        clearInterval(interval)
      }
    }, 1000)
  }

  onMounted(() => {
    const getTimeInLocalStorage = localStorage.getItem('time')
    if (getTimeInLocalStorage) {
      intervalTime()
      const time = parseInt(getTimeInLocalStorage)
      const now = Date.now()
      if (now - time > 120000) {
        localStorage.removeItem('time')
      } else {
        isDisableButton.value = true
      }
    }
  })

</script>

<template>
  <main>
    <h1>
      Verify Account {{ isVerify ? "✅" : "❌" }}
    </h1>

    <p v-if="error">{{error}}</p>
    <p v-if="resendValid">Please check your email</p>
    <button
      v-if="tokenExpired"
      ref="refButtonResend"
      :disabled="isDisableButton"
      @click="handleResend">
      {{stringTime ? `2:00 - ${stringTime}` : 'Resend email'}}
    </button>
  </main>

</template>

<style lang="scss" scoped>
  main{
    display: grid;
    place-content: center;
    height: 80vh;

  }

  button{
    cursor: pointer;
    margin-top: 1rem;
    border: 0;
    padding: 10px;
    font-size: 16px;
    color: #fff;
    background-color: rgb(17, 88, 132);
    width: 60%;
    border-radius: 5px;
    &:disabled{
      opacity: 0.5;
    }
  }
</style>
