<script lang="ts" setup>
  import { useConfirmAccount } from '../composables/useConfirmAccount'
  const { isVerify, resendEmail, tokenExpired, error, resendValid } = useConfirmAccount()

</script>

<template>
  <main>
    <h1>
      Verify Account {{ isVerify ? "✅"  : "❌" }}
    </h1>

    <p v-if="error">{{error}}</p>
    <p v-if="resendValid">Please check your email</p>
    <button @click="resendEmail" v-if="tokenExpired">Resend Token</button>
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
  }
</style>
