import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routes'
import { useBreadcrumb } from '@/pinia/stores/breadcrumb'
import { useRouteOperateState, RouteOperateState } from '@/pinia/stores/routeOperateState'
import { useMenuData } from '@/pinia/stores/menuData'
import { useUserInfo } from '@/pinia/stores/userInfo'
import { breadcrumbSeesion } from '@/storage/session-storage'
import { isLogin, getUserInfo, getMenu } from '@/views/authenticate/server'

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
    try {
      await isLogin()
      const { setMenuData, setMenuDataDone } = useMenuData()
      const { setUserInfo } = useUserInfo()
      try {
        const userInfoRes = await getUserInfo()
        const menuRes = await getMenu()
        // 更新pinia内的菜单数据
        setMenuData(menuRes.data)
        // 将pinia内菜单数据获取状态设置为完成
        setMenuDataDone(true)
        // 更新pinia内的用户信息
        setUserInfo(userInfoRes.data)
      } catch (error) {
        // 将pinia内菜单数据获取状态设置为完成
        setMenuDataDone(true)
      }
      if (to.meta.needAuth === false) return { name: 'Home' }
    } catch (error) {
      if (to.meta.needAuth == true || to.name === 'NotFound') return { name: 'Login' }
    }
  }
})

router.afterEach((to, from) => {})

export default router
