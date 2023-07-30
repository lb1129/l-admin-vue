import axios from 'axios'
import config from '@/config'
import { message } from 'ant-design-vue'
import 'ant-design-vue/es/message/style'
import { tokenLocalforage } from '@/storage/localforage'
import isAuthenticated from '@/router/isAuthenticated'
import i18n from '@/i18n'
import router from '@/router'
import { XMLParser } from 'fast-xml-parser'

export interface IResponse<T> {
  data: T
  errCode: number
  errMsg: string
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
      let messageContent = ''
      const response = error.response
      const contentType = response.headers['content-type']
      // NOTE 阿里云oss错误响应是application/xml
      if (contentType === 'application/xml') {
        const parser = new XMLParser()
        messageContent = parser.parse(response.data).Error.Message
      } else if (contentType === 'application/json') {
        if (response.data.error) messageContent = response.data.error.message
        else messageContent = response.data.errMsg
      }
      message.error(messageContent)
    }
    return Promise.reject(error)
  }
)

export default axiosInstance
