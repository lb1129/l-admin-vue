<template>
  <div class="not-found">
    <div class="not-found-title">404</div>
    <div class="not-found-desc">{{ $t('pageNotFound') }}</div>
    <div class="not-found-divider">
      <a-divider></a-divider>
    </div>
    <a-button type="primary" ghost shape="round" @click="goBack">{{ $t('back') }}</a-button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
const goBack = () => {
  router.back()
}
</script>

<style scoped lang="scss">
.not-found {
  padding: 160px 0 24px;
  text-align: center;

  &-title {
    line-height: 64px;
    font-size: 64px;
    font-weight: 600;
  }

  &-desc {
    padding-top: 12px;
    letter-spacing: 2px;
    line-height: 20px;
    font-size: 20px;
    font-weight: 700;
  }

  &-divider {
    margin: 24px auto 18px;
    width: 150px;
  }
}
</style>
