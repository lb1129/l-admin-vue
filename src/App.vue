<script setup lang="ts">
import { watchEffect, ref } from 'vue'
import enUS from 'ant-design-vue/es/locale/en_US'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import dayjs from 'dayjs'
import 'dayjs/locale/es'
import 'dayjs/locale/zh-cn'
import { useI18n } from 'vue-i18n'
const { locale } = useI18n()
const aLocale = ref<typeof enUS>()
watchEffect(() => {
  if (locale.value === 'en') {
    aLocale.value = enUS
    dayjs.locale('en')
  } else {
    aLocale.value = zhCN
    dayjs.locale('zh-cn')
  }
})
</script>

<template>
  <a-config-provider :locale="aLocale">
    <router-view />
  </a-config-provider>
</template>

<style scoped></style>
