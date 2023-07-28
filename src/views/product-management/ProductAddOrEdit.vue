<template>
  <a-page-header :title="title" @back="() => $router.back()">
    <template #extra>
      <a-button type="primary" @click="saveHandler" :loading="submitLoading">{{
        t('save')
      }}</a-button>
    </template>
    <a-skeleton :loading="dataLoading" active>
      <a-form :model="details" ref="formRef">
        <a-row :gutter="24">
          <a-col :span="8">
            <a-form-item name="name" label="名称" :rules="[{ required: true }]">
              <a-input v-model:value="details.name" />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item name="brand" label="品牌" :rules="[{ required: true }]">
              <a-input v-model:value="details.brand" />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item name="category" label="分类" :rules="[{ required: true }]">
              <a-input v-model:value="details.category" />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item name="price" label="价格" :rules="[{ required: true }]">
              <a-input-number
                style="width: 100%"
                :min="0"
                :precision="2"
                v-model:value="details.price"
              />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item name="color" label="颜色" :rules="[{ required: true }]">
              <a-input v-model:value="details.color" />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item name="inventory" label="库存" :rules="[{ required: true }]">
              <a-input-number
                style="width: 100%"
                :min="0"
                :precision="0"
                v-model:value="details.inventory"
              />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item name="style" label="样式" :rules="[{ required: true }]">
              <a-input v-model:value="details.style" />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item name="enable" label="是否启用">
              <a-checkbox v-model:checked="details.enable" />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item name="describe" label="描述">
              <a-textarea v-model:value="details.describe" />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item name="images" label="图片">
              <a-upload
                accept="image/*"
                list-type="picture-card"
                multiple
                v-model:file-list="fileList"
                :custom-request="customRequestHandler"
                :max-count="5"
                :before-upload="beforeUploadHandler"
                @remove="uploadRemoveHandler"
              >
                <plus-outlined v-if="fileList.length < 5"></plus-outlined>
              </a-upload>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-skeleton>
  </a-page-header>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { message } from 'ant-design-vue'
import type { UploadFile, FormInstance, UploadProps } from 'ant-design-vue'
import 'ant-design-vue/es/message/style'
import { getProductByIdServe, saveProductServe } from '@/serves/product'
import type { ProductType } from '@/types/product'
import pubsub from '@/pubsub'
import { productEditDone } from '@/pubsub/events'
import { uploadServe } from '@/serves/file'
import type { UploadRequestOption, RcFile } from 'ant-design-vue/es/vc-upload/interface'

const dataLoading = ref(false)
const submitLoading = ref(false)
const details = reactive<ProductType>({
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
const formRef = ref<FormInstance>()
const route = useRoute()
const router = useRouter()
const { t } = useI18n()
const title = computed(() => (route.params.id ? t('edit') : t('add')))
const fileList = ref<UploadFile[]>([])

const saveHandler = async () => {
  submitLoading.value = true
  try {
    await formRef.value?.validateFields()
    const images: string[] = []
    // 取出状态为success的url
    fileList.value.forEach((file) => {
      if (file.status === 'success') images.push(file.url as string)
    })
    await saveProductServe({
      ...details,
      images
    })
    submitLoading.value = false
    pubsub.emit(productEditDone)
    message.success(t('whatSuccess', [t('save')]))
    router.back()
  } catch (error) {
    submitLoading.value = false
  }
}

const beforeUploadHandler: UploadProps['beforeUpload'] = (file, files) => {
  const len = fileList.value.length
  const canUploadFiles = files.slice(0, 5 - len)
  return canUploadFiles.some((item) => item.uid === file.uid)
}

const customRequestHandler = async (ops: UploadRequestOption) => {
  const uid = (ops.file as RcFile).uid
  try {
    const url = await uploadServe(ops.file as File, (percent) => {
      ops.onProgress && ops.onProgress({ percent: percent })
    })
    ops.onSuccess && ops.onSuccess(url)
    const idx = fileList.value.findIndex((item) => item.uid === uid)
    if (idx > -1) {
      fileList.value.splice(idx, 1, {
        uid,
        name: '',
        status: 'success',
        url
      })
    }
  } catch (error) {
    const idx = fileList.value.findIndex((item) => item.uid === uid)
    if (idx > -1) {
      fileList.value.splice(idx, 1, {
        uid,
        name: '',
        status: 'error',
        url: ''
      })
    }
  }
}

const uploadRemoveHandler = (file: UploadFile) => {
  fileList.value = fileList.value.filter((item) => item.uid !== file.uid)
}

onMounted(async () => {
  if (route.params.id) {
    dataLoading.value = true
    try {
      const res = await getProductByIdServe(route.params.id as string)
      Object.assign(details, res.data)
      fileList.value = details.images.map((url, idx) => ({
        uid: `${idx}`,
        name: '',
        url,
        status: 'success'
      }))
      dataLoading.value = false
    } catch (error) {
      dataLoading.value = false
    }
  }
})
</script>

<style scoped></style>
