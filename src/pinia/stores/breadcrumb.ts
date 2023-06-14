import { ref } from 'vue'
import { defineStore } from 'pinia'
import { breadcrumbSeesion } from '@/storage/session-storage'

export interface Breadcrumb {
  routeName: string
  menuName: string
}

export const useBreadcrumb = defineStore('breadcrumb', () => {
  const breadcrumb = ref<Breadcrumb[]>([])
  function setBreadcrumb(data: Breadcrumb[]) {
    breadcrumb.value = data
    breadcrumbSeesion.set(breadcrumb.value)
  }
  return { breadcrumb, setBreadcrumb }
})
