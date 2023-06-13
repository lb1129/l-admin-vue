import { type AxiosInstance } from 'axios'
import 'vue-router'

declare module 'vue' {
  interface ComponentCustomProperties {
    $http: AxiosInstance
  }
}

declare module 'vue-router' {
  interface RouteMeta {
    needAuth?: boolean
    hidden?: boolean
    menuName?: string
  }
}
