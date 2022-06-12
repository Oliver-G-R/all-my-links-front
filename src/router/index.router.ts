import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import Home from '../pages/Home.vue'
import SignUp from '../pages/SignUp.vue'
import SignIn from '../pages/SignIn.vue'
import Page404 from '../pages/404.vue'
import { store } from '../store/index'

const routes:RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: Home
    /* meta: {
      requiresAuth: true
    } */
  },
  {
    path: '/signIn',
    name: 'sign-in',
    beforeEnter: (to, from, next) => {
      if (store.getters['user/stateActivUser']) {
        next('/')
      } else next()
    },
    component: SignIn
  },
  {
    path: '/signUp',
    name: 'sign-up',
    beforeEnter: (to, from, next) => {
      if (store.getters['user/stateActivUser']) {
        next('/')
      } else next()
    },
    component: SignUp
  },
  {
    path: '/:pathMatch(.*)*',
    component: Page404
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const activUser = store.getters['user/stateActivUser']
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (requiresAuth) {
    if (activUser) { next() } else {
      next({
        path: '/signIn'
      })
    }
  } else {
    next()
  }
})

export default router
