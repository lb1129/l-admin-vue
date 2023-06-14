<template>
  <a-dropdown>
    <span v-bind="$attrs">
      <GlobalOutlined style="font-size: 16px" />
    </span>
    <template #overlay>
      <a-menu :selected-keys="selectedKeys" @click="toggleLanguage">
        <a-menu-item key="zh-cn">简体中文</a-menu-item>
        <a-menu-item key="en">English</a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<script lang="ts">
export default {
  inheritAttrs: false
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { type MenuInfo } from 'ant-design-vue/es/menu/src/interface'
import { useI18n } from 'vue-i18n'
const { locale } = useI18n()
const toggleLanguage = (menuInfo: MenuInfo) => {
  locale.value = menuInfo.key as string
}
const selectedKeys = computed(() => [locale.value])
</script>

<style scoped></style>
