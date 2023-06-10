<template>
  <a-layout class="index">
    <a-layout-header class="index-header">
      <div class="index-header-logo">
        <a href="/">
          <img :src="logoSvg" alt="logo" />
          {{ systemName }}
        </a>
      </div>
      <div class="index-header-center"></div>
      <div class="index-header-right">
        <a-dropdown>
          <span class="index-header-right-item index-header-right-item_user">
            <a-avatar size="small" :src="userPng" />
            <span style="margin-left: 8px">viho</span>
          </span>
          <template #overlay>
            <a-menu @click="topRightMenuItemClickHandle">
              <a-menu-item key="PersonalCenter">个人中心</a-menu-item>
              <a-menu-divider />
              <a-menu-item key="logout">退出登录</a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
        <ToggleLanguage class="index-header-right-item" />
      </div>
    </a-layout-header>
    <a-layout>
      <a-layout-sider collapsible :collapsedWidth="48" :width="208" theme="light">
        <div class="index-slider-content">
          <a-menu
            @click="leftMenuItemClickHandle"
            :selectedKeys="selectedKeys"
            v-model:openKeys="openKeys"
            mode="inline"
          >
            <a-menu-item key="Home">
              <dashboard-outlined />
              <span>首页</span>
            </a-menu-item>
            <a-sub-menu key="ProductManagement">
              <template #title>
                <span>
                  <shop-outlined />
                  <span>产品管理</span>
                </span>
              </template>
              <a-menu-item key="ProductList">
                <span>产品列表</span>
              </a-menu-item>
            </a-sub-menu>
            <a-sub-menu key="UserManagement">
              <template #title>
                <span>
                  <user-outlined />
                  <span>用户管理</span>
                </span>
              </template>
              <a-menu-item key="PersonalCenter">
                <span>个人中心</span>
              </a-menu-item>
            </a-sub-menu>
          </a-menu>
        </div>
      </a-layout-sider>
      <a-layout style="padding: 0 24px 24px">
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item v-for="(item, index) in breadcrumbList" :key="(item.name as string)">
            <a
              @click="
                () => {
                  $router.go(index + 1 - breadcrumbList.length)
                }
              "
              >{{ item.meta.title }}</a
            >
          </a-breadcrumb-item>
        </a-breadcrumb>
        <a-layout-content class="index-content">
          <router-view v-slot="{ Component }">
            <transition
              mode="out-in"
              :name="
                routeOperateState === RouteOperateState.back
                  ? 'slide-right'
                  : routeOperateState === RouteOperateState.forward
                  ? 'slide-left'
                  : 'fade'
              "
            >
              <keep-alive :include="breadcrumbList.map((item) => item.name as string)">
                <component :is="Component" />
              </keep-alive>
            </transition>
          </router-view>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { type MenuInfo } from 'ant-design-vue/es/menu/src/interface'
import { useRoute, useRouter } from 'vue-router'
import { useRouteOperateState, RouteOperateState } from '@/pinia/stores/route-operate-state'
import { useBreadcrumbList } from '@/pinia/stores/breadcrumb-list'
import { Modal } from 'ant-design-vue'
import 'ant-design-vue/es/modal/style/index.css'
import logoSvg from '@/assets/image/logo.svg'
import userPng from '@/assets/image/user.png'
const systemName = import.meta.env.VITE_SYSTEM_NAME
const { routeOperateState } = storeToRefs(useRouteOperateState())
const { breadcrumbList } = storeToRefs(useBreadcrumbList())
const route = useRoute()
const router = useRouter()
// 左侧菜单选中keys
const selectedKeys = computed(() => [route.name as string])
// 左侧菜单打开keys
const openKeys = ref<string[]>([])
watch(
  () => route.matched,
  (value) => {
    // 倒序循环 将所有需要打开的菜单key添加到openKeys
    let current = value[value.length - 1]
    for (let i = value.length - 2; i >= 0; --i) {
      const record = value[i]
      const recordName = record.name as string
      if (record.children.some((child) => child.name === current.name)) {
        if (openKeys.value.indexOf(recordName) === -1) openKeys.value.push(recordName)
        current = record
      } else {
        break
      }
    }
  },
  {
    immediate: true
  }
)
const leftMenuItemClickHandle = (menuInfo: MenuInfo) => {
  const key = menuInfo.key
  router.replace({
    name: key as string
  })
}
const topRightMenuItemClickHandle = (menuInfo: MenuInfo) => {
  const key = menuInfo.key
  switch (key) {
    case 'logout':
      Modal.confirm({
        title: '提示',
        content: '确定注销登录吗？',
        onOk() {
          router.replace({
            name: 'Login'
          })
        }
      })
      break
    default:
      router.replace({
        name: key as string
      })
      break
  }
}
</script>

<style scoped lang="less">
.index {
  height: 100%;

  &-header {
    display: flex;
    align-items: center;
    padding: 0 16px;
    color: @white;

    &-logo {
      font-weight: 600;
      font-size: 18px;

      & > a {
        display: flex;
        align-items: center;
        color: @white;

        & > img {
          width: 38px;
          height: 38px;
        }
      }
    }

    &-center {
      flex: 1;
    }

    &-right {
      display: flex;

      :deep(&-item) {
        padding: 0 12px;
        cursor: pointer;
        transition: all 0.3s;

        &:hover {
          background-color: #252a3d;
        }
      }

      &-item_user {
        display: flex;
        align-items: center;
      }
    }
  }

  &-slider-content {
    height: 100%;
    overflow: auto;
    border-bottom: @border-width-base solid @border-color-base;
  }

  &-content {
    background-color: @component-background;
    overflow: hidden;
  }
}
</style>
