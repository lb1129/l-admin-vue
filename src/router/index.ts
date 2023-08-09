import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routes'
import isAuthenticated from './isAuthenticated'

const createHistory =
  import.meta.env.VITE_NOT_SUPPORT_HISTORY === 'true' ? createWebHashHistory : createWebHistory

const router = createRouter({
  history: createHistory(import.meta.env.VITE_PUBLIC_URL),
  routes
})

router.beforeEach(async (to) => {
  // 是否已登录 跳转控制
  try {
    await isAuthenticated.value
    if (to.meta.needAuth === false) return { name: 'Home' }
  } catch (error) {
    if (to.meta.needAuth == true) return { name: 'Login' }
  }
})

// router.afterEach((to, from) => {})

export default router
