<template>
  <a-page-header :ghost="false" :title="t('detail')" @back="() => $router.back()">
    <template #extra>
      <a-button
        type="primary"
        :disabled="operateAuthValueToDisabled(operateAuth.edit)"
        @click="
          () => {
            $router.push({ name: 'ProductAddOrEdit', params: { id: '1' } })
          }
        "
        >{{ t('edit') }}</a-button
      >
    </template>
    <a-skeleton :loading="dataLoading">
      <a-descriptions bordered>
        <a-descriptions-item label="name">{{ details.name }}</a-descriptions-item>
        <a-descriptions-item label="brand">{{ details.brand }}</a-descriptions-item>
        <a-descriptions-item label="category">{{ details.category }}</a-descriptions-item>
        <a-descriptions-item label="price">{{ details.price }}</a-descriptions-item>
        <a-descriptions-item label="color">{{ details.color }}</a-descriptions-item>
        <a-descriptions-item label="inventory">{{ details.inventory }}</a-descriptions-item>
        <a-descriptions-item label="style" :span="3">{{ details.style }}</a-descriptions-item>
        <a-descriptions-item label="describe">{{ details.describe }}</a-descriptions-item>
      </a-descriptions>
    </a-skeleton>
  </a-page-header>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useAuth, operateAuthValueToDisabled } from '@/utils/useAuth'
import { getProductById, type ProductType } from './server'

const dataLoading = ref(false)
const details = ref<ProductType>({
  id: '',
  name: '',
  brand: '',
  category: '',
  price: 0,
  color: '',
  style: '',
  enable: true,
  inventory: 0,
  describe: ''
})
const { operateAuth } = useAuth()
const route = useRoute()
const { t } = useI18n()

watch(
  route,
  async (value, oldValue) => {
    if (!oldValue || value.params.id !== oldValue.params.id) {
      dataLoading.value = true
      details.value = await getProductById(value.params.id as string)
      dataLoading.value = false
    }
  },
  { immediate: true }
)
</script>

<style scoped></style>
