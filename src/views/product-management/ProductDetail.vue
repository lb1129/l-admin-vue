<template>
  <a-page-header
    :ghost="false"
    title="详情详情详情"
    sub-title="This is a subtitle"
    @back="() => $router.go(-1)"
  >
    <template #extra>
      <a-button
        type="primary"
        @click="
          () => {
            $router.push({ name: 'ProductEdit', params: { id: '1' } })
          }
        "
        >编辑</a-button
      >
    </template>
    <a-descriptions size="small" :column="3">
      <a-descriptions-item label="Created">Lili Qu</a-descriptions-item>
      <a-descriptions-item label="Association">
        <a-input v-model:value="val" />
      </a-descriptions-item>
      <a-descriptions-item label="Creation Time">2017-01-10</a-descriptions-item>
      <a-descriptions-item label="Effective Time">2017-10-10</a-descriptions-item>
      <a-descriptions-item label="Remarks">
        Gonghu Road, Xihu District, Hangzhou, Zhejiang, China
      </a-descriptions-item>
    </a-descriptions>
  </a-page-header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const val = ref()
</script>

<style scoped></style>
