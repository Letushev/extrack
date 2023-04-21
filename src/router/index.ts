import { createRouter, createWebHistory } from 'vue-router'

import { useAuthStore } from '@/stores/auth'

declare module 'vue-router' {
  interface RouteMeta {
    requiredUserState?: 'authorized' | 'not-authorized'
  }
}

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: 'login',
      path: '/login',
      meta: { requiredUserState: 'not-authorized' },
      component: () => import('@/pages/LoginPage.vue')
    },
    {
      name: 'signup',
      path: '/signup',
      meta: { requiredUserState: 'not-authorized' },
      component: () => import('@/pages/SignupPage.vue')
    },
    {
      path: '/',
      component: () => import('@/components/layout/AppLayout.vue'),
      meta: { requiredUserState: 'authorized' },
      children: [
        {
          path: '/',
          redirect: { name: 'tracking', replace: true }
        },
        {
          name: 'tracking',
          path: 'tracking',
          component: () => import('@/pages/TrackingPage.vue')
        },
        {
          name: 'exercises',
          path: 'exercises',
          component: () => import('@/pages/ExercisesPage.vue')
        },
        {
          path: '/:notFound(.*)*',
          name: 'NotFound',
          component: () => import('@/pages/NotFound.vue')
        }
      ]
    }
  ]
})

router.beforeEach((to) => {
  const authStore = useAuthStore()

  if (to.meta.requiredUserState === 'authorized' && !authStore.isAuthorized) {
    return { name: 'login' }
  }

  if (to.meta.requiredUserState === 'not-authorized' && authStore.isAuthorized) {
    return { name: 'tracking' }
  }
})

export default router
