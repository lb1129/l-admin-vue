<template>
  <div class="authenticate">
    <div class="authenticate-header">
      <ToggleLanguage />
    </div>
    <div class="authenticate-title">{{ systemName }}</div>
    <div class="authenticate-desc">{{ $t('systemDesc', [systemName]) }}</div>
    <div class="authenticate-main">
      <router-view v-slot="{ Component }">
        <transition mode="out-in" name="fade">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
    <div class="authenticate-footer">
      Copyright © 2023 XX CRM<a-divider type="vertical" /><router-link
        target="_blank"
        :to="{ name: 'privacy' }"
        >{{ $t('privacyPolicy') }}</router-link
      >
    </div>
  </div>
</template>

<script setup lang="ts">
const systemName = import.meta.env.VITE_SYSTEM_NAME
</script>

<style scoped lang="scss">
.authenticate {
  min-height: 100%;
  background-color: #f0f2f5;
  padding-bottom: 24px;

  &-header {
    height: 40px;
    line-height: 40px;
    text-align: right;
    padding-right: 24px;
    margin-bottom: 32px;
  }

  &-title {
    font-size: 33px;
    font-weight: 600;
    text-align: center;
  }

  &-desc {
    font-size: 14px;
    color: rgb(0 0 0 / 45%);
    margin-top: 12px;
    margin-bottom: 40px;
    text-align: center;
  }

  &-main {
    width: 368px;
    margin: 0 auto;
  }

  &-footer {
    text-align: center;
    margin: 48px 0 24px;

    &,
    & > a {
      color: rgb(0 0 0 / 45%);
      font-size: 14px;
    }
  }
}
</style>
