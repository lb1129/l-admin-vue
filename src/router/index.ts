import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
  type RouteLocationRaw,
  type RouteLocationNamedRaw
} from 'vue-router'
import routes from './routes'
import { useBreadcrumb } from '@/pinia/stores/breadcrumb'
import { useRouteOperateState, RouteOperateState } from '@/pinia/stores/routeOperateState'
import isAuthenticated from './isAuthenticated'

const createHistory =
  import.meta.env.VITE_NOT_SUPPORT_HISTORY === 'true' ? createWebHashHistory : createWebHistory

const router = createRouter({
  history: createHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from) => {
  const { setRouteOperateState } = useRouteOperateState()
  const { setBreadcrumb } = useBreadcrumb()
  const toHistory = to.query.history as string
  const fromHistory = from.query.history as string
  // 路由操作状态
  if (toHistory && toHistory.split(',').includes(from.name as string)) {
    setRouteOperateState(RouteOperateState.forward)
  } else if (fromHistory && fromHistory.split(',').includes(to.name as string)) {
    setRouteOperateState(RouteOperateState.back)
  } else {
    setRouteOperateState(RouteOperateState.replace)
  }
  // 面包屑
  let breadcrumb = to.meta.menuName
    ? [{ routeName: to.name as string, menuName: to.meta.menuName as string }]
    : []
  if (toHistory) {
    breadcrumb = toHistory
      .split(',')
      .map((history) => {
        const route = router.getRoutes().find((route) => route.name === history)
        return {
          routeName: history,
          menuName: route?.meta.menuName as string
        }
      })
      .concat(breadcrumb)
  }
  setBreadcrumb(breadcrumb)
})

router.beforeEach(async (to, from) => {
  // 是否已登录 跳转控制
  try {
    await isAuthenticated.value
    if (to.meta.needAuth === false) return { name: 'Home' }
  } catch (error) {
    if (to.meta.needAuth == true) return { name: 'Login' }
  }
})

router.afterEach((to, from) => {})

// 重写push
const { push } = router
router.push = (to: RouteLocationRaw) => {
  const locationNamedRaw = to as RouteLocationNamedRaw
  const name = locationNamedRaw.name
  // 命名路由 都应该用路由名称跳转
  if (name) {
    const routes = router.getRoutes()
    const route = routes.find((route) => route.name === locationNamedRaw.name)
    const currentRoute = router.currentRoute.value
    if (route?.meta.hidden) {
      if (!locationNamedRaw.query) locationNamedRaw.query = {}
      locationNamedRaw.query.history = currentRoute.query.history
        ? `${currentRoute.query.history},${currentRoute.name as string}`
        : (currentRoute.name as string)
    }
  }
  return push(to)
}

export default router
