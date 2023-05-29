import { breadcrumbList } from './keys'
import { type Breadcrumb } from '@/pinia/stores/breadcrumb-list'

// 面包屑列表
export const breadcrumbListSeesion = {
  get() {
    let result: Breadcrumb[]
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
  set(value: Breadcrumb[]) {
    sessionStorage.setItem(breadcrumbList, JSON.stringify(value))
  },
  clear() {
    sessionStorage.removeItem(breadcrumbList)
  }
}
