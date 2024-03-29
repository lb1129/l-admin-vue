<template>
  <div style="height: 100%" ref="wrapRef">
    <a-table
      :loading="dataLoading"
      :dataSource="dataSource"
      :columns="columns"
      bordered
      row-key="_id"
      :scroll="{ x: 1200, y: height }"
      :row-selection="{
        selectedRowKeys,
        onChange: (keys: Key[]) => {
          selectedRowKeys = keys as string[]
        }
      }"
      @resizeColumn="
        (w: number, col: TableColumnType<ProductType>) => {
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
          <a-popconfirm
            :disabled="operateAuthValueToDisabled(operateAuth.delete)"
            :title="$t('areYouSureDelete')"
            @confirm="deleteHandle()"
          >
            <a-button type="primary" :disabled="operateAuthValueToDisabled(operateAuth.delete)">{{
              t('delete')
            }}</a-button>
          </a-popconfirm>
        </a-button-group>
        <div style="float: right">
          <a-input-search
            @search="
              (value = '') => {
                if (queryParams.keyword !== value) {
                  queryParams.keyword = value
                  queryParams.pageNo = 1
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
          <link-plus
            :disabled="operateAuthValueToDisabled(operateAuth.detail)"
            :to="{ name: 'ProductDetail', params: { id: record._id } }"
            >{{ record.name }}</link-plus
          >
        </template>
        <template v-else-if="column.key === 'operation'">
          <a-button
            type="link"
            :disabled="operateAuthValueToDisabled(operateAuth.edit)"
            @click="addOrEditHandle(record._id)"
            >{{ t('edit') }}</a-button
          >
          <a-divider type="vertical" />
          <a-popconfirm
            :disabled="operateAuthValueToDisabled(operateAuth.delete)"
            :title="$t('areYouSureDelete')"
            @confirm="deleteHandle(record._id)"
          >
            <a-button type="link" :disabled="operateAuthValueToDisabled(operateAuth.delete)">{{
              t('delete')
            }}</a-button>
          </a-popconfirm>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch, onMounted, onUnmounted } from 'vue'
import type { TableColumnType, TableProps } from 'ant-design-vue'
import { message } from 'ant-design-vue'
import 'ant-design-vue/es/message/style'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useResize } from '@/utils/useResize'
import { useAuth, operateAuthValueToDisabled } from '@/utils/useAuth'
import { getProductsServe, deleteProductByIdsServe } from '@/serves/product'
import type { ProductType, ProductsQueryParamsType } from '@/types/product'
import type { Key } from 'ant-design-vue/es/table/interface'
import pubsub from '@/pubsub'
import { productEditDone } from '@/pubsub/events'

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
    fixed: 'right',
    align: 'center'
  }
])
const dataSource = ref<ProductType[]>([])
const total = ref(0)
const queryParams = reactive<ProductsQueryParamsType>({
  pageNo: 1,
  pageSize: 10,
  keyword: ''
})
const router = useRouter()
const { t } = useI18n()
const { operateAuth } = useAuth()
const { height } = useResize(wrapRef, { minusHeight: 64.8 + 64 + 54.8 })

const addOrEditHandle = (id?: string) => {
  router.push({
    name: 'ProductAddOrEdit',
    params: {
      id
    }
  })
}
const deleteHandle = async (id?: string) => {
  const ids = id ? [id] : selectedRowKeys.value
  dataLoading.value = true
  try {
    await deleteProductByIdsServe(ids)
    message.success(t('whatSuccess', [t('delete')]))
    loadData()
  } catch (error) {
    dataLoading.value = false
  }
}
const changeHandle: TableProps<ProductType>['onChange'] = (pagination, filters, sorter) => {
  queryParams.pageNo = pagination.current as number
  queryParams.pageSize = pagination.pageSize as number
}

const tablePaginationConfig = computed(() => ({
  total: total.value,
  current: queryParams.pageNo,
  pageSize: queryParams.pageSize,
  showTotal: (total: number) => t('whatTotal', [total]),
  showSizeChanger: true,
  showLessItems: true,
  showQuickJumper: true
}))

const loadData = async () => {
  dataLoading.value = true
  try {
    const res = await getProductsServe(queryParams)
    dataSource.value = res.data.data
    total.value = res.data.total
    dataLoading.value = false
  } catch (error) {
    dataLoading.value = false
  }
}

onMounted(() => {
  pubsub.on(productEditDone, loadData)
})

onUnmounted(() => {
  pubsub.off(productEditDone, loadData)
})

watch(queryParams, loadData, { immediate: true })
</script>

<style scoped lang="less"></style>
