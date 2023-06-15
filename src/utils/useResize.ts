import { ref, type Ref, watchEffect, unref } from 'vue'
import ResizeObserver from 'resize-observer-polyfill'

export const useResize = (
  node: HTMLElement | Ref<HTMLElement | undefined>,
  options?: {
    minusWidth?: number | Ref<number>
    minusHeight?: number | Ref<number>
  }
) => {
  const width = ref(0)
  const height = ref(0)

  watchEffect((onCleanup) => {
    const element = unref(node)
    if (element) {
      const ro = new ResizeObserver((entries) => {
        width.value = entries[0].contentRect.width - (options ? unref(options.minusWidth ?? 0) : 0)
        height.value =
          entries[0].contentRect.height - (options ? unref(options.minusHeight ?? 0) : 0)
      })
      ro.observe(element)
      onCleanup(() => ro.unobserve(element))
    }
  })
  return { width, height }
}
