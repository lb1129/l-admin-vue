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
        <a-dropdown v-model:visible="pickerVisible">
          <span class="index-header-right-item">
            <BgColorsOutlined style="font-size: 16px" />
          </span>
          <template #overlay>
            <ColorPicker
              @click="pickerVisible = true"
              :value="themeColor"
              @update:value="
                (color) => {
                  toggleThemeColor(color.hex)
                }
              "
              :presets="[
                '#1677ff',
                '#f5222d',
                '#fa541c',
                '#faad14',
                '#13c2c2',
                '#52c41a',
                '#2f54eb',
                '#722ed1'
              ]"
            />
          </template>
        </a-dropdown>
        <a-dropdown>
          <span class="index-header-right-item index-header-right-item_user">
            <a-avatar size="small" :src="userPng" />
            <span style="margin-left: 8px">{{ userInfoStore.userInfo.userName }}</span>
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
      <a-layout-sider
        breakpoint="md"
        collapsible
        v-model:collapsed="collapsed"
        :collapsedWidth="48"
        :width="208"
        theme="light"
      >
        <div class="index-slider-content">
          <IndexMenu :collapsed="collapsed" />
        </div>
      </a-layout-sider>
      <a-layout style="padding: 0 24px 24px">
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item v-for="(item, index) in breadcrumbs" :key="item.routeName">
            <template v-if="index === breadcrumbs.length - 1">
              {{ t(item.menuName) }}
            </template>
            <a
              v-else
              @click="
                () => {
                  router.push({ name: item.routeName })
                }
              "
              >{{ t(item.menuName) }}</a
            >
          </a-breadcrumb-item>
        </a-breadcrumb>
        <a-layout-content class="index-content">
          <router-view v-slot="{ Component }">
            <!-- <transition mode="out-in" name="fade"> -->
            <keep-alive :include="keepAliveInclude">
              <component :is="Component" />
            </keep-alive>
            <!-- </transition> -->
          </router-view>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import { computed, ref, onBeforeMount, watchEffect } from 'vue'
import { type MenuInfo } from 'ant-design-vue/es/menu/src/interface'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { Modal, message } from 'ant-design-vue'
import 'ant-design-vue/es/modal/style'
import 'ant-design-vue/es/message/style'
import logoSvg from '@/assets/image/logo.svg'
import userPng from '@/assets/image/user.png'
import IndexMenu from './IndexMenu'
import { tokenLocalforage } from '@/storage/localforage'
import { useUserInfo } from '@/pinia/stores/userInfo'
import { logout } from '@/views/authenticate/servers'
import { themeLocalforage } from '@/storage/localforage'
import { toggleThemeColor } from '@/utils/themeColor'

const systemName = import.meta.env.VITE_SYSTEM_NAME
const collapsed = ref(false)
const themeColor = ref('#1890ff')
const pickerVisible = ref(false)
const keepAliveInclude = ref<string[]>([])
const { t } = useI18n()
const router = useRouter()
const route = useRoute()
const userInfoStore = useUserInfo()

const breadcrumbs = computed(() => {
  return route.matched.slice(1).map((item) => ({
    routeName: item.name,
    menuName: item.meta.menuName ?? ''
  }))
})

watchEffect(() => {
  const record = route.matched[route.matched.length - 1]
  if (!record.meta.hidden) {
    keepAliveInclude.value = [record.name as string]
  }
})

const topRightMenuItemClickHandle = (menuInfo: MenuInfo) => {
  const key = menuInfo.key as string
  switch (key) {
    case 'logout':
      Modal.confirm({
        title: t('tip'),
        content: t('areYouSureToLogOut'),
        onOk: async function () {
          message.loading(t('signingOutPleaseWait'), 0)
          try {
            await logout()
            await tokenLocalforage.clear()
            message.destroy()
            router.replace({
              name: 'Login'
            })
          } catch (error) {
            message.destroy()
          }
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

onBeforeMount(async () => {
  const val = await themeLocalforage.get()
  if (val) themeColor.value = val
})
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
