import { ref, onMounted, onUnmounted, type Ref, watchEffect, unref } from 'vue'

function useResizeHeight(node: Ref<HTMLElement | undefined>, minusHeight?: number | Ref<number>) {
  const height = ref(0)
  const calcTableHeight = () => {
    const el = node.value
    if (el) height.value = el.getBoundingClientRect().height - unref(minusHeight ?? 0)
  }
  watchEffect(calcTableHeight)
  onMounted(() => {
    window.addEventListener('resize', calcTableHeight)
  })
  onUnmounted(() => {
    window.removeEventListener('resize', calcTableHeight)
  })
  return { height }
}

export { useResizeHeight }
