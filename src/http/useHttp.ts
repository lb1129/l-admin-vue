import { ref, unref, watchEffect, type Ref } from 'vue'
import type { AxiosRequestConfig } from 'axios'
import http from './index'

export function useHttp<T, D = unknown>(
  config: AxiosRequestConfig<D> | Ref<AxiosRequestConfig<D>>,
  beforeLoad?: () => void,
  afterLoad?: () => void
) {
  const result = ref<T>()
  const error = ref()
  function forceLoad() {
    if (beforeLoad) beforeLoad()
    http<T>(unref(config))
      .then((res) => {
        result.value = res
      })
      .catch((err) => {
        error.value = err
      })
      .finally(() => {
        if (afterLoad) afterLoad()
      })
  }
  watchEffect(() => {
    forceLoad()
  })
  return { result, error, forceLoad }
}
