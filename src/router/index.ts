import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'
import { useRouteOperateState, RouteOperateState } from '@/pinia/stores/route-operate-state'
import { useBreadcrumbList } from '@/pinia/stores/breadcrumb-list'
import { breadcrumbListSeesion } from '@/utils/session-storage'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// 是否首次进入
let fisrtEnter = true

router.beforeEach(async (to, from) => {
  const { updateRouteOperateState } = useRouteOperateState()
  const { breadcrumbList, updateBreadcrumbList } = useBreadcrumbList()
  // 首次进入 初始化面包屑列表
  if (fisrtEnter) {
    let initBreadcrumbList = breadcrumbListSeesion.get()
    if (!initBreadcrumbList.length) initBreadcrumbList = [to]
    updateBreadcrumbList(initBreadcrumbList)
    fisrtEnter = false
  } else {
    // 根据to路由页面是否在面包屑列表内，做路由操作状态切换以及面包屑列表增删
    const toIndex = breadcrumbList.findIndex((item) => to.name === item.name)
    if (toIndex < 0) {
      if (to.meta.noMenu) {
        updateRouteOperateState(RouteOperateState.forward)
        updateBreadcrumbList([...breadcrumbList, to])
      } else {
        updateRouteOperateState(RouteOperateState.replace)
        updateBreadcrumbList([to])
      }
    } else {
      updateRouteOperateState(RouteOperateState.back)
      updateBreadcrumbList(breadcrumbList.slice(0, toIndex + 1))
    }
  }
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
