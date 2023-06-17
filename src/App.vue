<script setup lang="ts">
import { watch, watchEffect, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useMenuData, type MenuDataItemType } from '@/pinia/stores/menuData'
import { useRouter, type RouteRecordRaw } from 'vue-router'
import { getChildrenPath } from '@/router/tools'
import { lazyLoad } from '@/router/tools'
import enUS from 'ant-design-vue/es/locale/en_US'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import dayjs from 'dayjs'
import 'dayjs/locale/es'
import 'dayjs/locale/zh-cn'

const { locale } = useI18n()
const aLocale = ref<typeof enUS>()

const menuDataStore = useMenuData()
const router = useRouter()

watchEffect(() => {
  if (locale.value === 'en') {
    aLocale.value = enUS
    dayjs.locale('en')
  } else {
    aLocale.value = zhCN
    dayjs.locale('zh-cn')
  }
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
    // NOTE 路由同步操作 上一个操作会被取消掉 暂未找到api可以让操作都执行
    // NOTE 等上一个路由地址更新完成 再触发重新匹配
    setTimeout(() => {
      router.replace(location.pathname)
    }, 10)
  }
})
</script>

<template>
  <a-config-provider :locale="aLocale" :input="{ autocomplete: 'off' }">
    <router-view />
  </a-config-provider>
</template>

<style scoped></style>
