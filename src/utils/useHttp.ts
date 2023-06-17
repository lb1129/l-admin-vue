import { ref } from 'vue'
import { type AxiosRequestConfig } from 'axios'
import http from '@/http'

function useHttp<T, D>(config: AxiosRequestConfig<D>) {
  const data = ref<T>()
  const error = ref()
  http<T>(config)
    .then((res) => {
      data.value = res
    })
    .catch((err) => {
      error.value = err
    })
  return { data, error }
}

export { useHttp }
