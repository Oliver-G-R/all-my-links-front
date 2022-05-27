<template>
    <header class="header">
        <nav class="header__nav container">
            <router-link class="header__logo" to="/">All my links</router-link>

            <ul class="header__list-nav">
                <li>
                    <router-link class="header__link" to="/signIn">Sign In</router-link>
                </li>
                <li>
                    <router-link class="header__link" to="/signUp">Sign Up</router-link>
                </li>
            </ul>
        </nav>
    </header>
</template>
