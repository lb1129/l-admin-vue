<template>
  <a-page-header :title="t('detail')" @back="() => $router.back()">
    <template #extra>
      <a-button
        type="primary"
        :disabled="operateAuthValueToDisabled(operateAuth.edit)"
        @click="
          () => {
            $router.push({ name: 'ProductAddOrEdit', params: { id: details._id } })
          }
        "
        >{{ t('edit') }}</a-button
      >
    </template>
    <a-skeleton :loading="dataLoading">
      <a-descriptions bordered>
        <a-descriptions-item label="名称">{{ details.name }}</a-descriptions-item>
        <a-descriptions-item label="品牌">{{ details.brand }}</a-descriptions-item>
        <a-descriptions-item label="分类">{{ details.category }}</a-descriptions-item>
        <a-descriptions-item label="价格">{{ details.price }}</a-descriptions-item>
        <a-descriptions-item label="颜色">{{ details.color }}</a-descriptions-item>
        <a-descriptions-item label="库存">{{ details.inventory }}</a-descriptions-item>
        <a-descriptions-item label="样式" :span="3">{{ details.style }}</a-descriptions-item>
        <a-descriptions-item label="描述" :span="3">{{ details.describe }}</a-descriptions-item>
        <a-descriptions-item label="图片" :span="3">
          <a-image-preview-group>
            <a-image
              :width="104"
              :height="104"
              v-for="url in details.images"
              :key="url"
              :src="url"
            />
          </a-image-preview-group>
        </a-descriptions-item>
      </a-descriptions>
    </a-skeleton>
  </a-page-header>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useAuth, operateAuthValueToDisabled } from '@/utils/useAuth'
import { getProductByIdServe } from '@/serves/product'
import type { ProductType } from '@/types/product'

const dataLoading = ref(false)
const details = ref<ProductType>({
  name: '',
  brand: '',
  category: '',
  price: 0,
  color: '',
  style: '',
  enable: true,
  inventory: 0,
  describe: '',
  images: []
})
const { operateAuth } = useAuth()
const route = useRoute()
const { t } = useI18n()

const loadData = async () => {
  if (route.params.id) {
    dataLoading.value = true
    try {
      const res = await getProductByIdServe(route.params.id as string)
      details.value = res.data
      dataLoading.value = false
    } catch (error) {
      dataLoading.value = false
    }
  }
}

onMounted(() => {
  loadData()
})
</script>

<style scoped></style>
