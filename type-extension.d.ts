import { type AxiosInstance } from 'axios'
import 'vue-router'

declare module 'vue' {
  interface ComponentCustomProperties {
    $http: AxiosInstance
  }
}

declare module 'vue-router' {
  interface RouteMeta {
    title?: string
    // 是否是没有菜单的路由
    noMenu?: boolean
  }
}
