<template>
  <ul class="personal-center">
    <li class="personal-center-left">
      <a-menu mode="inline" :selectedKeys="selectedKeys" @click="menuClickHandler">
        <a-menu-item key="BasicInfo">{{ $t('basicInfo') }}</a-menu-item>
        <a-menu-item key="SecuritySetting">{{ $t('securitySetting') }}</a-menu-item>
      </a-menu>
    </li>
    <li class="personal-center-right">
      <router-view />
    </li>
  </ul>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { MenuInfo } from 'ant-design-vue/es/menu/src/interface'

const router = useRouter()
const route = useRoute()
const selectedKeys = computed(() => [route.name as string])

const menuClickHandler = (menuInfo: MenuInfo) => {
  router.push({
    name: menuInfo.key as string
  })
}
</script>

<style scoped lang="less">
.personal-center {
  height: 100%;
  display: flex;

  &-left {
    border-right: 1px solid @border-color-base;
    width: 224px;
  }

  &-right {
    flex: 1;
    padding: 10px 40px;
  }
}
</style>
