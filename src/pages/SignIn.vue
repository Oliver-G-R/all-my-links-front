<script setup lang="ts">
import FormAuth from '../components/FormAuth.vue'

</script>
<template>
    <main class="container auth-page">
        <section class="auth-page__section-auth">
            <h1 class="auth-page__title">
                Sign In
            </h1>
            <FormAuth typeForm="sign-in" />
            <div class="auth-page__forgot-password">
                <p>Forgot your password? </p>
                <router-link to="/auth/forgot-password">
                    Reset Password
                </router-link>
            </div>
        </section>

    </main>
</template>

<style lang="scss" scoped>
    .auth-page{
        &__forgot-password{
            display: flex;
            align-items: center;
            margin-top: 1rem;
            p{
                margin-right: 2rem;
            }
            a{
                color: #00a8ff;
                text-decoration: none;
            }

        }
    }
</style>
