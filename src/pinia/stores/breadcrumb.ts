import { ref } from 'vue'
import { defineStore } from 'pinia'

export interface Breadcrumb {
  routeName: string
  menuName: string
}

export const useBreadcrumb = defineStore('breadcrumb', () => {
  const breadcrumb = ref<Breadcrumb[]>([])
  function setBreadcrumb(data: Breadcrumb[]) {
    breadcrumb.value = data
  }
  return { breadcrumb, setBreadcrumb }
})
