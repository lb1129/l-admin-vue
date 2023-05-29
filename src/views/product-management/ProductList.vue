<template>
  <div style="height: 100%" ref="wrapRef">
    <a-table
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
      @resizeColumn="handleResizeColumn"
    >
      <template #title>
        <a-button-group>
          <a-button type="primary">新增</a-button>
          <a-button type="primary" @click="deleteHandle()">删除</a-button>
        </a-button-group>
      </template>
      <template
        #bodyCell="{
          column,
          record
        }: {
          column: TableColumnType<ProductRecord>,
          record: ProductRecord
        }"
      >
        <template v-if="column.key === 'name'">
          <router-link :to="{ name: 'ProductDetail', params: { id: record.id } }">{{
            record.name
          }}</router-link>
        </template>
        <template v-else-if="column.key === 'operation'">
          <a-button type="link">编辑</a-button>
          <a-divider type="vertical" />
          <a-button type="link" @click="deleteHandle(record.id)">删除</a-button>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { type TableColumnType } from 'ant-design-vue'
import { useResizeHeight } from '@/composables/resize-height'
import { onMounted, onUnmounted } from 'vue'
import pubsub from '@/utils/pubsub'
import { productEditDone } from '@/utils/pubsub/events'
interface ProductRecord {
  id: string
  name: string
  brand: string
  category: string
  price: number
  color: string
  style: string
  enable: number
  inventory: number
  describe: string
}
const dataSource = ref<ProductRecord[]>([
  {
    id: '1',
    name: 'AppleMacBook Air',
    brand: 'Apple',
    category: '电脑整机/笔记本',
    price: 7199.0,
    color: '深空灰色',
    style: '13.3英寸 M1芯片 8+7核 8G+256G',
    enable: 1,
    inventory: 33,
    describe: ''
  },
  {
    id: '2',
    name: 'AppleMacBook Air',
    brand: 'Apple',
    category: '电脑整机/笔记本',
    price: 9499.0,
    color: '深空灰色',
    style: '13.3英寸 M1芯片 8+7核 8G+512G',
    enable: 1,
    inventory: 0,
    describe: ''
  },
  {
    id: '3',
    name: 'AppleMacBook Air',
    brand: 'Apple',
    category: '电脑整机/笔记本',
    price: 9499.0,
    color: '深空灰色',
    style: '13.3英寸 M1芯片 8+7核 16G+256G',
    enable: 1,
    inventory: 0,
    describe: ''
  },
  {
    id: '4',
    name: 'AppleMacBook Air',
    brand: 'Apple',
    category: '电脑整机/笔记本',
    price: 10999.0,
    color: '深空灰色',
    style: '13.3英寸 M1芯片 8+7核 16G+512G',
    enable: 1,
    inventory: 0,
    describe: ''
  },
  {
    id: '5',
    name: 'AppleMacBook Air',
    brand: 'Apple',
    category: '电脑整机/笔记本',
    price: 7199.0,
    color: '银色',
    style: '13.3英寸 M1芯片 8+7核 8G+256G',
    enable: 1,
    inventory: 33,
    describe: ''
  },
  {
    id: '6',
    name: 'AppleMacBook Air',
    brand: 'Apple',
    category: '电脑整机/笔记本',
    price: 9499.0,
    color: '银色',
    style: '13.3英寸 M1芯片 8+7核 8G+512G',
    enable: 1,
    inventory: 0,
    describe: ''
  },
  {
    id: '7',
    name: 'AppleMacBook Air',
    brand: 'Apple',
    category: '电脑整机/笔记本',
    price: 9499.0,
    color: '银色',
    style: '13.3英寸 M1芯片 8+7核 16G+256G',
    enable: 1,
    inventory: 0,
    describe: ''
  },
  {
    id: '8',
    name: 'AppleMacBook Air',
    brand: 'Apple',
    category: '电脑整机/笔记本',
    price: 10999.0,
    color: '银色',
    style: '13.3英寸 M1芯片 8+7核 16G+512G',
    enable: 1,
    inventory: 0,
    describe: ''
  },
  {
    id: '9',
    name: 'AppleMacBook Air',
    brand: 'Apple',
    category: '电脑整机/笔记本',
    price: 7199.0,
    color: '金色',
    style: '13.3英寸 M1芯片 8+7核 8G+256G',
    enable: 1,
    inventory: 33,
    describe: ''
  },
  {
    id: '10',
    name: 'AppleMacBook Air',
    brand: 'Apple',
    category: '电脑整机/笔记本',
    price: 9499.0,
    color: '金色',
    style: '13.3英寸 M1芯片 8+7核 8G+512G',
    enable: 1,
    inventory: 0,
    describe: ''
  },
  {
    id: '11',
    name: 'AppleMacBook Air',
    brand: 'Apple',
    category: '电脑整机/笔记本',
    price: 9499.0,
    color: '金色',
    style: '13.3英寸 M1芯片 8+7核 16G+256G',
    enable: 1,
    inventory: 0,
    describe: ''
  },
  {
    id: '12',
    name: 'AppleMacBook Air',
    brand: 'Apple',
    category: '电脑整机/笔记本',
    price: 10999.0,
    color: '金色',
    style: '13.3英寸 M1芯片 8+7核 16G+512G',
    enable: 1,
    inventory: 0,
    describe: ''
  }
])

const columns = ref<TableColumnType<ProductRecord>[]>([
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
const handleResizeColumn = (w: number, col: TableColumnType<ProductRecord>) => {
  col.width = w
}
const wrapRef = ref<HTMLElement>()
const { height } = useResizeHeight(wrapRef, 64.8 + 64 + 54.8)
const selectedRowKeys = ref<string[]>([])
const deleteHandle = (id?: string) => {
  const ids = id ? [id] : selectedRowKeys
}
const getDataSource = () => {
  console.log('get productEditDone evet')
}
onMounted(() => {
  pubsub.on(productEditDone, getDataSource)
})
onUnmounted(() => {
  pubsub.off(productEditDone, getDataSource)
})
</script>

<style scoped lang="scss"></style>
