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
              <a-menu-item key="PersonalCenter">{{ t('personalCenter') }}</a-menu-item>
              <a-menu-divider />
              <a-menu-item key="logout">{{ t('logOut') }}</a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
        <ToggleLanguage class="index-header-right-item" />
      </div>
    </a-layout-header>
    <a-layout>
      <a-layout-sider breakpoint="md" collapsible :collapsedWidth="48" :width="208" theme="light">
        <div class="index-slider-content">
          <IndexMenu />
        </div>
      </a-layout-sider>
      <a-layout style="padding: 0 24px 24px">
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item v-for="item in []" :key="(item as string)">
            {{ item }}
          </a-breadcrumb-item>
        </a-breadcrumb>
        <a-layout-content class="index-content">
          <router-view v-slot="{ Component }">
            <transition mode="out-in" name="fade">
              <keep-alive :include="[]">
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
import { type MenuInfo } from 'ant-design-vue/es/menu/src/interface'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { Modal } from 'ant-design-vue'
import 'ant-design-vue/es/modal/style'
import logoSvg from '@/assets/image/logo.svg'
import userPng from '@/assets/image/user.png'
import IndexMenu from './IndexMenu'
import { tokenLocalforage } from '@/utils/localforage'

const systemName = import.meta.env.VITE_SYSTEM_NAME
const { t } = useI18n()
const router = useRouter()

const topRightMenuItemClickHandle = (menuInfo: MenuInfo) => {
  const key = menuInfo.key as string
  switch (key) {
    case 'logout':
      Modal.confirm({
        title: t('tip'),
        content: t('areYouSureToLogOut'),
        onOk: async function () {
          await tokenLocalforage.clear()
          router.replace({
            name: 'Login'
          })
        }
      })
      break
    default:
      router.push({
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