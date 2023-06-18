import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { MenuDataItemType } from '@/views/personal-center/types'

export const useMenuData = defineStore('menuData', () => {
  const menuData = ref<MenuDataItemType[]>([])
  const menuDataDone = ref<boolean>(false)
  function setMenuData(payload: MenuDataItemType[]) {
    menuData.value = payload
  }
  function setMenuDataDone(payload: boolean) {
    menuDataDone.value = payload
  }
  return { menuData, menuDataDone, setMenuData, setMenuDataDone }
})
