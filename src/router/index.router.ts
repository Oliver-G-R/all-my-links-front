import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import Home from '../pages/Home.vue'
import SignUp from '../pages/SignUp.vue'
import SignIn from '../pages/SignIn.vue'

const routes:RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/signIn',
    name: 'sign-in',
    component: SignIn
  },
  {
    path: '/signUp',
    name: 'sign-up',
    component: SignUp
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
