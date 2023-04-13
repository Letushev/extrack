import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: 'login',
      path: '/login',
      component: () => import('@/views/LoginPage.vue')
    },
    {
      name: 'signup',
      path: '/signup',
      component: () => import('@/views/SignupPage.vue')
    },
    {
      name: 'exercises',
      path: '/exercises',
      component: () => import('@/views/ExercisesPage.vue')
    }
  ]
})

export default router
