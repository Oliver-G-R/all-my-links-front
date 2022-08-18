<script lang="ts" setup>
  import { useConfirmAccount } from '../composables/useConfirmAccount'
import { useTimeOut } from '../composables/useTimeOut'
  const { isVerify, resendEmail, tokenExpired, error, resendValid } = useConfirmAccount()
  const { isDisableButton, stringTime, startTime } = useTimeOut('time-verify-account', 120000)
  const handleResend = async () => {
    await resendEmail()
    startTime()
  }

</script>

<template>
  <main class="container">
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
      {{stringTime ? `02:00 - ${stringTime}` : 'Resend email'}}
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
