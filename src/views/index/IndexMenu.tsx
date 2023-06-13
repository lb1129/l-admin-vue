import { computed, defineComponent, ref, watchEffect, type VNode } from 'vue'
import { useMenuData, type MenuDataItemType } from '@/pinia/stores/menuData'
import { useBreadcrumb } from '@/pinia/stores/breadcrumb'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { type MenuInfo } from 'ant-design-vue/es/menu/src/interface'

export default defineComponent({
  setup() {
    const menuDataStore = useMenuData()
    const breadcrumbStore = useBreadcrumb()
    const { t } = useI18n()
    const route = useRoute()
    const router = useRouter()

    const generateMenuItems = (list: MenuDataItemType[], parent?: MenuDataItemType) => {
      const result: VNode[] = []
      list.forEach((menu) => {
        const children = menu.children
        if (children && children.length) {
          result.push(
            <a-sub-menu key={menu.name}>
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
        } else {
          if (!menu.hidden) {
            result.push(
              <a-menu-item key={menu.pageUrl!.split('/')[1]}>
                <span>{t(menu.name)}</span>
              </a-menu-item>
            )
          }
        }
      })
      return result
    }
    // 菜单点击处理
    const clickHandle = (menuInfo: MenuInfo) => {
      if (breadcrumbStore.breadcrumb.length > 1) {
        router.go(1 - breadcrumbStore.breadcrumb.length)
      }
      setTimeout(() => {
        router.push({
          name: menuInfo.key as string
        })
      }, 10)
    }
    // 左侧菜单选中keys 路由与菜单selectedKeys联动
    const selectedKeys = computed(() => [route.name])
    // 左侧菜单打开keys
    const openKeys = ref<string[]>([])
    // 路由与菜单openKeys联动
    watchEffect(() => {
      const keys: string[] = []
      const matched = route.matched
      for (let i = matched.length - 2; i > 0; i--) {
        const record = matched[i]
        if (record.children.some((child) => child.name === route.name)) {
          keys.push(record.name as string)
        }
      }
      openKeys.value = keys
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
        <a-menu-item key="Home">
          <dashboard-outlined />
          <span>{t('homePage')}</span>
        </a-menu-item>
        {...menuNodes.value}
        <a-menu-item key="PersonalCenter">
          <user-outlined />
          <span>{t('personalCenter')}</span>
        </a-menu-item>
      </a-menu>
    )
  }
})
