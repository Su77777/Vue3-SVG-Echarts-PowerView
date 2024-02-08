import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'powerview',
      component: ()=> import('../views/power-view.vue')
    }
  ]
})

export default router
