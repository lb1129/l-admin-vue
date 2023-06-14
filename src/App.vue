<script setup lang="ts">
import { watch, watchEffect, ref, onBeforeMount } from 'vue'
import { useI18n } from 'vue-i18n'
import { tokenLocalforage } from '@/storage/localforage'
import userMenuData from '@/mock/userMenuData.json'
import { useUserInfo } from '@/pinia/stores/userInfo'
import { useMenuData, type MenuDataItemType } from '@/pinia/stores/menuData'
import { useRouter, useRoute, type RouteRecordRaw } from 'vue-router'
import { getChildrenPath } from '@/router/tools'
import { lazyLoad } from '@/router/tools'
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
  const generateRoutes = (list: MenuDataItemType[]) => {
    const res: RouteRecordRaw[] = []
    list.forEach((record) => {
      const children = record.children
      if (children && children.length) {
        const redirectChild = children.find((child) => !child.hidden)
        let redirect
        if (redirectChild && redirectChild.pageUrl) {
          redirect = { name: redirectChild.pageUrl.split('/')[1] }
        }
        res.push({
          name: record.name,
          path: getChildrenPath(record.path),
          redirect,
          children: generateRoutes(children)
        })
      } else if (record.pageUrl) {
        const [directory, fileName] = record.pageUrl.split('/')
        const meta: RouteRecordRaw['meta'] = { needAuth: true, menuName: record.name }
        if (record.hidden) meta.hidden = true
        res.push({
          name: fileName,
          path: getChildrenPath(record.path),
          component: lazyLoad(directory, fileName),
          meta
        })
      }
    })
    return res
  }
  const routes = generateRoutes(menuDataStore.menuData)
  routes.forEach((route) => {
    router.addRoute('Index', route)
  })
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
