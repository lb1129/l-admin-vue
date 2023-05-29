import { ref } from 'vue'
import { type RouteMeta } from 'vue-router'
import { defineStore } from 'pinia'
import { breadcrumbListSeesion } from '@/utils/session-storage'

export interface Breadcrumb {
  name: string
  meta: RouteMeta
}

export const useBreadcrumbList = defineStore('breadcrumbList', () => {
  const breadcrumbList = ref<Breadcrumb[]>([])
  function updateBreadcrumbList(data: Breadcrumb[]) {
    breadcrumbList.value = data
    breadcrumbListSeesion.set(breadcrumbList.value)
  }
  return { breadcrumbList, updateBreadcrumbList }
})
