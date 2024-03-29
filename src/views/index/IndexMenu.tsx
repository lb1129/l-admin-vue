import { computed, defineComponent, defineAsyncComponent, ref, watchEffect, type VNode } from 'vue'
import { useMenuData } from '@/pinia/stores/menuData'
import type { MenuDataItemType } from '@/types/menu'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { type MenuInfo } from 'ant-design-vue/es/menu/src/interface'
import { FolderOutlined } from '@ant-design/icons-vue'

export default defineComponent({
  props: {
    collapsed: Boolean
  },
  setup(props) {
    const menuDataStore = useMenuData()
    const { t } = useI18n()
    const route = useRoute()
    const router = useRouter()

    const generateMenuItems = (list: MenuDataItemType[]) => {
      const result: VNode[] = []
      list.forEach((menu) => {
        const children = menu.children
        if (children && children.length) {
          // 根据菜单配置获取菜单图标
          const Icon = menu.icon
            ? defineAsyncComponent({
                loader: () => import(`@ant-design/icons-vue/es/icons/${menu.icon}.js`),
                errorComponent: FolderOutlined
              })
            : FolderOutlined
          result.push(
            <a-sub-menu key={menu.name}>
              {{
                default: () => generateMenuItems(children),
                title: () => (
                  <span>
                    <Icon />
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
      router.push({
        name: menuInfo.key as string
      })
    }
    // 左侧菜单选中keys 路由与菜单selectedKeys联动
    const selectedKeys = computed(() => [route.name])
    // 左侧菜单打开keys
    const openKeys = ref<string[]>([])
    // 路由与菜单openKeys联动
    watchEffect(() => {
      if (!props.collapsed) {
        openKeys.value = route.matched.slice(1, -1).map((item) => item.name as string)
      }
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
