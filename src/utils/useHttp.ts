import { ref } from 'vue'
import { type AxiosRequestConfig } from 'axios'
import http from '@/http'

function useHttp(config: AxiosRequestConfig) {
  const data = ref(null)
  const error = ref(null)
  http(config)
    .then((res) => {
      data.value = res.data
    })
    .catch((err) => {
      error.value = err
    })
  return { data, error }
}

export { useHttp }
