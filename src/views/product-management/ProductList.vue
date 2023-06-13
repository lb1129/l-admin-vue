<template>
  <div style="height: 100%" ref="wrapRef">
    <a-table
      :loading="dataLoading"
      :dataSource="dataSource"
      :columns="columns"
      bordered
      row-key="id"
      :scroll="{ x: 1200, y: height }"
      :row-selection="{
        selectedRowKeys,
        onChange: (keys) => {
          selectedRowKeys = keys as string[]
        }
      }"
      @resizeColumn="
        (w, col) => {
          col.width = w
        }
      "
      :pagination="tablePaginationConfig"
      @change="changeHandle"
    >
      <template #title>
        <a-button-group>
          <a-button
            type="primary"
            @click="addOrEditHandle()"
            :disabled="operateAuthValueToDisabled(operateAuth.add)"
            >{{ t('add') }}</a-button
          >
          <a-button
            type="primary"
            @click="deleteHandle()"
            :disabled="operateAuthValueToDisabled(operateAuth.delete)"
            >{{ t('delete') }}</a-button
          >
        </a-button-group>
        <div style="float: right">
          <a-input-search
            @search="
              (value = '') => {
                if (queryParams.keyword !== value) {
                  queryParams.keyword = value
                  queryParams.pagination.pageNo = 1
                }
              }
            "
            :placeholder="t('queryByName')"
            enter-button
          />
        </div>
      </template>
      <template
        #bodyCell="{
          column,
          record
        }: {
          column: TableColumnType<ProductType>,
          record: ProductType
        }"
      >
        <template v-if="column.key === 'name'">
          <router-link :to="{ name: 'ProductDetail', params: { id: record.id } }">{{
            record.name
          }}</router-link>
        </template>
        <template v-else-if="column.key === 'operation'">
          <a-button
            type="link"
            :disabled="operateAuthValueToDisabled(operateAuth.edit)"
            @click="addOrEditHandle(record.id)"
            >{{ t('edit') }}</a-button
          >
          <a-divider type="vertical" />
          <a-button
            type="link"
            @click="deleteHandle(record.id)"
            :disabled="operateAuthValueToDisabled(operateAuth.delete)"
            >{{ t('delete') }}</a-button
          >
        </template>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue'
import type { TableColumnType, TableProps } from 'ant-design-vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useResizeHeight } from '@/composables/resize-height'
import { useAuth, operateAuthValueToDisabled } from '@/utils/useAuth'
import { getProducts, type ProductType, type ProductsQueryParamsType } from './server'

const wrapRef = ref<HTMLElement>()
const dataLoading = ref(false)
const selectedRowKeys = ref<string[]>([])
const columns = ref<TableColumnType<ProductType>[]>([
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
    width: 150,
    fixed: 'left'
  },
  {
    title: '品牌',
    dataIndex: 'brand',
    key: 'brand',
    width: 150,
    resizable: true
  },
  {
    title: '类别',
    dataIndex: 'category',
    key: 'category',
    width: 150
  },
  {
    title: '价格',
    dataIndex: 'price',
    key: 'price',
    width: 150
  },
  {
    title: '颜色',
    dataIndex: 'color',
    key: 'color',
    width: 150
  },
  {
    title: '款式',
    dataIndex: 'style',
    key: 'style',
    width: 150,
    ellipsis: true
  },
  {
    title: '是否启用',
    dataIndex: 'enable',
    key: 'enable',
    width: 150
  },
  {
    title: '库存',
    dataIndex: 'inventory',
    key: 'inventory',
    width: 150
  },
  {
    title: '描述',
    dataIndex: 'describe',
    key: 'describe',
    width: 150
  },
  {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
    width: 180,
    fixed: 'right'
  }
])
const dataSource = ref<ProductType[]>([])
const total = ref(0)
const queryParams = reactive<ProductsQueryParamsType>({
  pagination: {
    pageNo: 1,
    pageSize: 10
  },
  keyword: ''
})
const router = useRouter()
const { t } = useI18n()
const { operateAuth } = useAuth()
const { height } = useResizeHeight(wrapRef, 64.8 + 64 + 54.8)

const addOrEditHandle = (id?: string) => {
  router.push({
    name: 'ProductAddOrEdit',
    params: {
      id
    }
  })
}
const deleteHandle = (id?: string) => {
  const ids = id ? [id] : selectedRowKeys
}
const changeHandle: TableProps<ProductType>['onChange'] = (pagination, filters, sorter) => {
  queryParams.pagination.pageNo = pagination.current as number
  queryParams.pagination.pageSize = pagination.pageSize as number
}

const tablePaginationConfig = computed(() => ({
  total: total.value,
  current: queryParams.pagination.pageNo,
  pageSize: queryParams.pagination.pageSize,
  showTotal: (total: number) => t('whatTotal', [total]),
  showSizeChanger: true,
  showLessItems: true,
  showQuickJumper: true
}))

watch(
  queryParams,
  async () => {
    dataLoading.value = true
    const result = await getProducts(queryParams)
    dataSource.value = result.data
    total.value = result.total
    dataLoading.value = false
  },
  { immediate: true }
)
</script>

<style scoped lang="less"></style>
