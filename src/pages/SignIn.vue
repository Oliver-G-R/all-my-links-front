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
        </section>

    </main>
</template>
