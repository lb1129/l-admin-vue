<template>
  <a-layout class="index">
    <a-layout-sider breakpoint="lg" v-model:collapsed="collapsed" :trigger="null" collapsible>
      <div class="index-slider">
        <div class="index-slider-logo" />
        <div class="index-slider-content">
          <vuescroll
            :ops="{
              bar: {
                background: '#fff',
                opacity: 0.5
              }
            }"
          >
            <a-menu
              @click="leftMenuItemClickHandle"
              :selectedKeys="selectedKeys"
              v-model:openKeys="openKeys"
              theme="dark"
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
          </vuescroll>
        </div>
      </div>
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="index-header">
        <menu-unfold-outlined
          v-if="collapsed"
          class="index-header-trigger"
          @click="() => (collapsed = !collapsed)"
        />
        <menu-fold-outlined
          v-else
          class="index-header-trigger"
          @click="() => (collapsed = !collapsed)"
        />
        <div class="index-header-right">
          <a-dropdown>
            <span class="index-header-right-item">
              <user-outlined style="font-size: 16px" />
              xxxx
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
      <a-layout-content class="index-content">
        <a-breadcrumb class="index-content-breadcrumb">
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
        <div class="index-content-box">
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
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import {
  UserOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  ShopOutlined,
  DashboardOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons-vue'
import { ref, computed, createVNode, watch } from 'vue'
import { storeToRefs } from 'pinia'
import vuescroll from 'vuescroll'
import { type MenuInfo } from 'ant-design-vue/es/menu/src/interface'
import { useRoute, useRouter } from 'vue-router'
import { useRouteOperateState, RouteOperateState } from '@/pinia/stores/route-operate-state'
import { useBreadcrumbList } from '@/pinia/stores/breadcrumb-list'
import { Modal } from 'ant-design-vue'
import 'ant-design-vue/es/modal/style/index.css'
const { routeOperateState } = storeToRefs(useRouteOperateState())
const { breadcrumbList } = storeToRefs(useBreadcrumbList())
const route = useRoute()
const router = useRouter()
const collapsed = ref<boolean>(false)
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
        icon: createVNode(ExclamationCircleOutlined),
        content: '确定注销登录吗？',
        okText: '确定',
        cancelText: '取消',
        onOk() {
          router.replace({
            name: 'login'
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

<style scoped lang="scss">
.index {
  height: 100%;

  &-slider {
    height: 100%;
    display: flex;
    flex-direction: column;

    &-logo {
      flex: 0 0 30px;
      margin: 16px;
      background: rgb(255 255 255 / 30%);
    }

    &-content {
      flex: auto;
      min-height: 0;
      overflow: auto;
    }
  }

  &-header {
    padding: 0 16px;
    background-color: #fff;

    :deep(.anticon) {
      color: rgb(0 0 0 / 65%);
    }

    &-trigger {
      font-size: 18px;
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: #1890ff;
      }
    }

    &-right {
      float: right;
    }

    &-right :deep(.index-header-right-item) {
      display: inline-block;
      padding: 0 12px;
      cursor: pointer;

      &:hover {
        background-color: rgb(0 0 0 / 2.5%);
      }
    }
  }

  &-content {
    display: flex;
    flex-direction: column;
    padding: 16px;

    &-breadcrumb {
      margin: 0 0 16px;
    }

    &-box {
      flex: auto;
      min-height: 0;
      background-color: #fff;
      overflow: hidden;
    }
  }
}
</style>
