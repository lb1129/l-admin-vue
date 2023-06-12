import { computed, defineComponent, ref, watchEffect, type VNode } from 'vue'
import { useMenuData, type MenuDataItemType } from '@/pinia/stores/menuData'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { type MenuInfo } from 'ant-design-vue/es/menu/src/interface'

export default defineComponent({
  setup() {
    const menuDataStore = useMenuData()
    const { t } = useI18n()
    const route = useRoute()
    const router = useRouter()

    const generateMenuItems = (list: MenuDataItemType[], parent?: MenuDataItemType) => {
      const result: VNode[] = []
      list.forEach((menu) => {
        if (!menu.hidden) {
          let item = (
            <a-menu-item key={parent ? `${parent.path}${menu.path}` : menu.path}>
              <span>{t(menu.name)}</span>
            </a-menu-item>
          )
          const children = menu.children
          if (children && children.length) {
            item = (
              <a-sub-menu key={parent ? `${parent.path}${menu.path}` : menu.path}>
                {{
                  default: () => generateMenuItems(children, menu),
                  title: () => (
                    <span>
                      <span>{t(menu.name)}</span>
                    </span>
                  )
                }}
              </a-sub-menu>
            )
          }
          result.push(item)
        }
      })
      return result
    }
    // 菜单点击处理
    const clickHandle = (menuInfo: MenuInfo) => {
      router.push({
        path: menuInfo.key as string
      })
    }
    // 左侧菜单选中keys 路由与菜单selectedKeys联动
    const selectedKeys = computed(() => [route.path])
    // 左侧菜单打开keys
    const openKeys = ref<string[]>([])
    // 路由与菜单openKeys联动
    watchEffect(() => {
      const pathnameArr = route.path.split('/')
      openKeys.value = pathnameArr.slice(1, -1).map((key) => `/${key}`)
    })
    // 菜单节点
    const menuNodes = computed(() => generateMenuItems(menuDataStore.menuData))

    return () => (
      <a-menu
        onClick={clickHandle}
        selectedKeys={selectedKeys.value}
        openKeys={openKeys.value}
        onOpenChange={(keys: string[]) => {
          openKeys.value = keys
        }}
        mode="inline"
      >
        <a-menu-item key="/">
          <dashboard-outlined />
          <span>{t('homePage')}</span>
        </a-menu-item>
        {...menuNodes.value}
        <a-menu-item key="/personalCenter">
          <user-outlined />
          <span>{t('personalCenter')}</span>
        </a-menu-item>
      </a-menu>
    )
  }
})
