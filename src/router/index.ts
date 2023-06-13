import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routes'
import { tokenLocalforage } from '@/utils/localforage'
import { useBreadcrumb } from '@/pinia/stores/breadcrumb'
import { useRouteOperateState, RouteOperateState } from '@/pinia/stores/routeOperateState'
import { breadcrumbSeesion } from '@/utils/session-storage'

const createHistory =
  import.meta.env.VITE_NOT_SUPPORT_HISTORY === 'true' ? createWebHashHistory : createWebHistory

const router = createRouter({
  history: createHistory(import.meta.env.BASE_URL),
  routes
})

let isFisrtEnter = true
router.beforeEach((to, from) => {
  if (to.matched[0].name === 'Index') {
    const { breadcrumb, setBreadcrumb } = useBreadcrumb()
    const { setRouteOperateState } = useRouteOperateState()
    const record = { routeName: to.name as string, menuName: to.meta.menuName as string }
    // 首次进入 初始化面包屑
    if (isFisrtEnter) {
      isFisrtEnter = false
      let initBreadcrumb = breadcrumbSeesion.get()
      if (!initBreadcrumb.length) initBreadcrumb = [record]
      setBreadcrumb(initBreadcrumb)
    } else {
      // 产生面包屑数据
      const index = breadcrumb.findIndex((item) => item.routeName === to.name)
      if (index > -1) {
        setRouteOperateState(RouteOperateState.back)
        setBreadcrumb(breadcrumb.slice(0, index + 1))
      } else {
        if (to.meta.hidden) {
          setRouteOperateState(RouteOperateState.forward)
          setBreadcrumb([...breadcrumb, record])
        } else {
          setRouteOperateState(RouteOperateState.replace)
          setBreadcrumb([record])
        }
      }
    }
  }
})

let isFisrtEnter1 = true
router.beforeEach(async (to, from) => {
  if (isFisrtEnter1) {
    isFisrtEnter1 = false
    // mock 是否已登录校验流程
    const token = await tokenLocalforage.get()
    if (token) {
      if (to.meta.needAuth === false) return { name: 'Home' }
    } else {
      if (to.meta.needAuth == true) return { name: 'Login' }
    }
  }
})

router.afterEach((to, from) => {})

export default router
