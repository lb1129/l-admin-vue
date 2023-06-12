import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routes'
import { tokenLocalforage } from '@/utils/localforage'

const createHistory =
  import.meta.env.VITE_NOT_SUPPORT_HISTORY === 'true' ? createWebHashHistory : createWebHistory

const router = createRouter({
  history: createHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from) => {
  // mock 是否已登录校验流程
  const token = await tokenLocalforage.get()
  if (token) {
    if (to.meta.needAuth === false) return { name: 'Home' }
  } else {
    if (to.meta.needAuth == true) return { name: 'Login' }
  }
})

router.afterEach((to, from) => {})

export default router
