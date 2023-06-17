import axios from 'axios'
import config from '@/config'
import { message } from 'ant-design-vue'
import 'ant-design-vue/es/message/style'
import { tokenLocalforage } from '@/storage/localforage'
import i18n from '@/i18n'

export interface IResponse<T> {
  data: T
  message: string
}

const axiosInstance = axios.create({
  baseURL: config.http.baseURL,
  timeout: config.http.timeout
})

axiosInstance.interceptors.request.use(
  async (config) => {
    config.headers.Authorization = await tokenLocalforage.get()
    config.headers['Accept-Language'] = i18n.global.locale.value
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    // 401 未登录重定向交给路由守卫处理
    if (error.response.status !== 401) {
      message.error(error.response.data.message)
    }
    return Promise.reject(error)
  }
)

export default axiosInstance
