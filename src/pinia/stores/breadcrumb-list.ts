import { ref } from 'vue'
import { defineStore } from 'pinia'
import { type RouteLocation } from 'vue-router'
import { breadcrumbListSeesion } from '@/utils/session-storage'

export const useBreadcrumbList = defineStore('breadcrumbList', () => {
  const breadcrumbList = ref<RouteLocation[]>([])
  function updateBreadcrumbList(data: RouteLocation[]) {
    breadcrumbList.value = data
    breadcrumbListSeesion.set(breadcrumbList.value)
  }
  return { breadcrumbList, updateBreadcrumbList }
})
