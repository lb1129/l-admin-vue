import axios from 'axios'
import config from '@/config'
import { message } from 'ant-design-vue'
import 'ant-design-vue/es/message/style'
import { tokenLocalforage } from '@/storage/localforage'
import { breadcrumbSeesion } from '@/storage/session-storage'
import isAuthenticated from '@/router/isAuthenticated'
import i18n from '@/i18n'
import queryString from 'query-string'
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
    // server是mock的
    if (import.meta.env.VITE_SERVER_IS_MOCK === 'true') {
      config.url = queryString.stringifyUrl({
        url: config.url as string,
        query: {
          authorization: await tokenLocalforage.get()
        }
      })
    }
    config.headers.Authorization = await tokenLocalforage.get()
    config.headers['Accept-Language'] = i18n.global.locale.value
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  async (response) => {
    // server是mock的
    if (import.meta.env.VITE_SERVER_IS_MOCK === 'true') {
      if (response.data.status >= 200 && response.data.status < 300) {
        return response.data.data
      } else {
        // 401 未登录
        if (response.data.status === 401) {
          if (router.currentRoute.value.meta.needAuth === true) {
            isAuthenticated.value = Promise.reject()
            await tokenLocalforage.clear()
            breadcrumbSeesion.clear()
            router.replace({
              name: 'Login'
            })
          }
        } else {
          message.error(response.data.data.message)
        }
        return Promise.reject(response.data.data.message)
      }
    }
    return response.data
  },
  async (error) => {
    // 401 未登录
    if (error.response.status === 401) {
      if (router.currentRoute.value.meta.needAuth === true) {
        isAuthenticated.value = Promise.reject()
        await tokenLocalforage.clear()
        breadcrumbSeesion.clear()
        router.replace({
          name: 'Login'
        })
      }
    } else {
      message.error(error.response.data.message)
    }
    return Promise.reject(error)
  }
)

export default axiosInstance
