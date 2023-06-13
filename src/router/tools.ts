import { defineComponent, ref, h, markRaw, type VNode } from 'vue'
import PageLoading from '@/components/PageLoading.vue'

export const Loading = PageLoading

export const lazyLoad = (directory: string, fileName: string) =>
  defineComponent({
    name: fileName,
    setup(props) {
      const comp = ref<VNode>()
      import(`@/views/${directory}/${fileName}.vue`).then((res) => {
        comp.value = markRaw<VNode>(res.default)
      })
      return () => (comp.value ? h(comp.value, props) : h(PageLoading))
    }
  })

export const getChildrenPath = (path: string) => {
  if (/^\/.*/.test(path)) {
    return path.slice(1)
  }
  return path
}
