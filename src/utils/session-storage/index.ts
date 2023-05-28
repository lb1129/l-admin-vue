import { breadcrumbList } from './keys'
import { type RouteLocation } from 'vue-router'

// 面包屑列表
export const breadcrumbListSeesion = {
  get() {
    let result: RouteLocation[]
    const value = sessionStorage.getItem(breadcrumbList)
    if (value) {
      try {
        result = JSON.parse(value)
      } catch (error) {
        result = []
      }
    } else {
      result = []
    }
    return result
  },
  set(value: string | RouteLocation[]) {
    let valueRaw: string
    if (typeof value === 'string') {
      valueRaw = value
    } else {
      valueRaw = JSON.stringify(value)
    }
    sessionStorage.setItem(breadcrumbList, valueRaw)
  },
  clear() {
    sessionStorage.removeItem(breadcrumbList)
  }
}
