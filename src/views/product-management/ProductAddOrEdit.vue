<template>
  <a-page-header :ghost="false" :title="title" @back="() => $router.back()">
    <template #extra>
      <a-button type="primary" @click="saveHandler" :loading="submitLoading">{{
        t('save')
      }}</a-button>
    </template>
    <a-skeleton :loading="dataLoading" active>
      <a-form :model="details" ref="formRef">
        <a-row :gutter="24">
          <a-col :span="8">
            <a-form-item name="name" label="name" :rules="[{ required: true }]">
              <a-input v-model:value="details.name" />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item name="brand" label="brand" :rules="[{ required: true }]">
              <a-input v-model:value="details.brand" />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item name="category" label="category" :rules="[{ required: true }]">
              <a-input v-model:value="details.category" />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item name="price" label="price" :rules="[{ required: true }]">
              <a-input-number
                style="width: 100%"
                :min="0"
                :precision="2"
                v-model:value="details.price"
              />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item name="color" label="color" :rules="[{ required: true }]">
              <a-input v-model:value="details.color" />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item name="inventory" label="inventory" :rules="[{ required: true }]">
              <a-input-number
                style="width: 100%"
                :min="0"
                :precision="0"
                v-model:value="details.inventory"
              />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item name="style" label="style" :rules="[{ required: true }]">
              <a-input v-model:value="details.style" />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item name="enable" label="enable">
              <a-checkbox v-model:checked="details.enable" />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item name="describe" label="describe">
              <a-textarea v-model:value="details.describe" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-skeleton>
  </a-page-header>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { type FormInstance, message } from 'ant-design-vue'
import 'ant-design-vue/es/message/style'
import { getProductById, saveProduct, type ProductType } from './server'

const dataLoading = ref(false)
const submitLoading = ref(false)
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
const formRef = ref<FormInstance>()
const route = useRoute()
const router = useRouter()
const { t } = useI18n()
const title = computed(() => (route.params.id ? t('edit') : t('add')))

const saveHandler = async () => {
  if (formRef.value) {
    const values = await formRef.value.validateFields()
    // mock 保存流程
    submitLoading.value = true
    await saveProduct(values as ProductType)
    submitLoading.value = false
    message.success(t('whatSuccess', [t('save')]))
    router.back()
  }
}
watch(
  route,
  async (value, oldValue) => {
    if (!oldValue || value.params.id !== oldValue.params.id) {
      if (value.params.id) {
        dataLoading.value = true
        details.value = await getProductById(value.params.id as string)
        dataLoading.value = false
      }
    }
  },
  { immediate: true }
)
</script>

<style scoped></style>
