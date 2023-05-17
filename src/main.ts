import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.router'
import { store } from './store'

import { globalCookiesConfig } from 'vue3-cookies'
import { cookiesDev, cookiesProd } from './constants/auth'

globalCookiesConfig(process.env.NODE_ENV === 'production' ? cookiesProd : cookiesDev)

createApp(App)
    .use(router)
    .use(store)
    .mount('#app')
