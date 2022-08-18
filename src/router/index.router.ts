import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import Home from '../pages/Home.vue'
import SignUp from '../pages/SignUp.vue'
import SignIn from '../pages/SignIn.vue'
import Profile from '../pages/Profile.vue'
import ProfileEdit from '../pages/ProfileEdit.vue'
import VerifyAccount from '../pages/VerifyAccount.vue'
import ResetPassword from '../pages/ResetPassword.vue'
import ForgotPassword from '../pages/ForgotPassword.vue'
import EmptyLayout from '../layouts/EmptyLayout.vue'
import Page404 from '../pages/404.vue'
import { store } from '../store/index'
import { expiredToke } from '../helpers/validToken'

const routes:RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: Home
  },

  {
    path: '/:nickName',
    name: 'profile',
    component: Profile
  },

  {
    path: '/signIn',
    name: 'sign-in',
    beforeEnter: (to, from, next) => {
      if (store.getters['auth/stateActivUser']) {
        next('/')
      } else next()
    },
    component: SignIn
  },
  {
    path: '/signUp',
    name: 'sign-up',
    beforeEnter: (to, from, next) => {
      if (store.getters['auth/stateActivUser']) {
        next('/')
      } else next()
    },
    component: SignUp
  },

  {
    path: '/settings/profile',
    name: 'profile-edit',
    component: ProfileEdit,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/auth',
    component: EmptyLayout,
    beforeEnter: (to, from, next) => {
      if (store.getters['auth/stateActivUser']) {
        next('/')
      } else next()
    },

    children: [
      {
        path: 'verify',
        component: VerifyAccount
      },
      {
        path: 'reset-password',
        component: ResetPassword,
        beforeEnter: (to, from, next) => {
          if (!to.query.token || expiredToke(to.query.token as string)) {
            next('/signIn')
          } else next()
        }
      },
      {
        path: 'forgot-password',
        component: ForgotPassword
      }
    ]

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
  const activUser = store.getters['auth/stateActivUser']
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
