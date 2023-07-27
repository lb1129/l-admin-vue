import axios from 'axios'
import config from '@/config'
import { message } from 'ant-design-vue'
import 'ant-design-vue/es/message/style'
import { tokenLocalforage } from '@/storage/localforage'
import isAuthenticated from '@/router/isAuthenticated'
import i18n from '@/i18n'
import router from '@/router'

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
    const token = await tokenLocalforage.get()
    if (token) config.headers.Authorization = `Bearer ${token}`
    config.headers['Accept-Language'] = i18n.global.locale.value
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  async (response) => {
    return response.data
  },
  async (error) => {
    // 401 未登录
    if (error.response.status === 401) {
      if (router.currentRoute.value.meta.needAuth === true) {
        isAuthenticated.value = Promise.reject()
        await tokenLocalforage.clear()
        router.replace({
          name: 'Login'
        })
      }
    } else {
      message.error(error.response.data.errMsg)
    }
    return Promise.reject(error)
  }
)

export default axiosInstance
