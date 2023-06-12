<script setup lang="ts">
import { watch, watchEffect, ref, onBeforeMount } from 'vue'
import { useI18n } from 'vue-i18n'
import { tokenLocalforage } from '@/utils/localforage'
import userMenuData from '@/mock/userMenuData.json'
import { useUserInfo } from '@/pinia/stores/user-info'
import { useMenuData, type MenuDataItemType } from '@/pinia/stores/menuData'
import { useRouter, useRoute } from 'vue-router'
import { lazyLoad } from '@/router/lazyLoad'
import enUS from 'ant-design-vue/es/locale/en_US'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import dayjs from 'dayjs'
import 'dayjs/locale/es'
import 'dayjs/locale/zh-cn'

const { locale } = useI18n()
const aLocale = ref<typeof enUS>()
const userInfoStore = useUserInfo()
const menuDataStore = useMenuData()
const router = useRouter()
const route = useRoute()

watchEffect(() => {
  if (locale.value === 'en') {
    aLocale.value = enUS
    dayjs.locale('en')
  } else {
    aLocale.value = zhCN
    dayjs.locale('zh-cn')
  }
})

// mock 已登录刷新流程
onBeforeMount(() => {
  tokenLocalforage.get().then((token) => {
    if (token) {
      setTimeout(() => {
        // 获取用户菜单
        const menuData = userMenuData[token as keyof typeof userMenuData]
        if (menuData) {
          // 更新pinia内的菜单数据
          menuDataStore.setMenuData(menuData)
          // 将pinia内菜单数据获取状态设置为完成
          menuDataStore.setMenuDataDone(true)
          // 更新pinia内的用户信息
          userInfoStore.setUserInfo({ userName: token })
        }
      }, 500)
    } else {
      // 将redux内菜单数据获取状态设置为完成
      menuDataStore.setMenuDataDone(true)
    }
  })
})

// 菜单数据生成动态路由
watch(menuDataStore, () => {
  const generateRoutes = (list: MenuDataItemType[], parentPath?: string) => {
    list.forEach((record) => {
      if (record.children && record.children.length) {
        generateRoutes(record.children, `${parentPath ?? ''}${record.path}`)
      } else if (record.pageUrl) {
        const [directory, fileName] = record.pageUrl.split('/')
        const path = `${parentPath ?? ''}${record.path}`
        // 在Index路由下新增动态路由
        router.addRoute('Index', {
          name: fileName,
          path: path.slice(1),
          component: lazyLoad(directory, fileName),
          meta: { needAuth: true }
        })
      }
    })
  }
  generateRoutes(menuDataStore.menuData)
  if (menuDataStore.menuDataDone) {
    // 动态路由添加完成
    // 先删除404路由
    // 再添加404路由 component 挂载为 404视图
    router.removeRoute('NotFound')
    router.addRoute({
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: lazyLoad('mixed', 'NotFound')
    })
    // 触发重新匹配
    router.replace(route.fullPath)
  }
})
</script>

<template>
  <a-config-provider :locale="aLocale" :input="{ autocomplete: 'off' }">
    <router-view />
  </a-config-provider>
</template>

<style scoped></style>
