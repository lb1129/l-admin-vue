<template>
  <a-layout class="home">
    <a-layout-sider breakpoint="lg" v-model:collapsed="collapsed" :trigger="null" collapsible>
      <div class="home-slider">
        <div class="home-slider-logo" />
        <div class="home-slider-content">
          <vuescroll
            :ops="{
              bar: {
                background: '#fff',
                opacity: 0.5
              }
            }"
          >
            <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
              <a-sub-menu key="productManagement">
                <template #title>
                  <span>
                    <shop-outlined />
                    <span>产品管理</span>
                  </span>
                </template>
                <a-menu-item key="productList">
                  <span>产品列表</span>
                </a-menu-item>
              </a-sub-menu>
              <a-sub-menu key="userManagement">
                <template #title>
                  <span>
                    <user-outlined />
                    <span>用户管理</span>
                  </span>
                </template>
                <a-menu-item key="personalCenter">
                  <span>个人中心</span>
                </a-menu-item>
              </a-sub-menu>
            </a-menu>
          </vuescroll>
        </div>
      </div>
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="home-header">
        <menu-unfold-outlined
          v-if="collapsed"
          class="home-header-trigger"
          @click="() => (collapsed = !collapsed)"
        />
        <menu-fold-outlined
          v-else
          class="home-header-trigger"
          @click="() => (collapsed = !collapsed)"
        />
        <div class="home-header-right">
          <a-dropdown>
            <span class="home-header-right-item">
              <user-outlined style="font-size: 16px" />
              xxxx
            </span>
            <template #overlay>
              <a-menu>
                <a-menu-item key="personalCenter">个人中心</a-menu-item>
                <a-menu-item key="logout">退出登录</a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
          <ToggleLanguage class="home-header-right-item" />
        </div>
      </a-layout-header>
      <a-layout-content class="home-content">
        <a-breadcrumb class="home-content-breadcrumb">
          <a-breadcrumb-item>User</a-breadcrumb-item>
          <a-breadcrumb-item>Bill</a-breadcrumb-item>
        </a-breadcrumb>
        <div class="home-content-box">
          <router-view></router-view>
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
  ShopOutlined
} from '@ant-design/icons-vue'
import 'simplebar/dist/simplebar.min.css'
import { ref } from 'vue'
import vuescroll from 'vuescroll'
const selectedKeys = ref<string[]>()
const collapsed = ref<boolean>(false)
</script>

<style scoped lang="scss">
.home {
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

    &-right :deep(.home-header-right-item) {
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
    }
  }
}
</style>
