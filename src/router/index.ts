import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from) => {
  // 是否登录
  const isAuthenticated = true
  // 是否有权限
  const isAuthorizated = true
  if (!isAuthenticated) {
    // 将用户重定向到登录页面
    return { name: 'login' }
  }
})

router.afterEach((to, from) => {
  const title = to.meta.title
  const prefix = title ? `${title} - ` : ''
  document.title = `${prefix}${import.meta.env.VITE_SYSTEM_NAME}`
})

export default router
