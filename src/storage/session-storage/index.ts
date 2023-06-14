import { breadcrumb } from './keys'
import { type Breadcrumb } from '@/pinia/stores/breadcrumb'

// 面包屑
export const breadcrumbSeesion = {
  get() {
    let result: Breadcrumb[]
    const value = sessionStorage.getItem(breadcrumb)
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
    sessionStorage.setItem(breadcrumb, JSON.stringify(value))
  },
  clear() {
    sessionStorage.removeItem(breadcrumb)
  }
}
