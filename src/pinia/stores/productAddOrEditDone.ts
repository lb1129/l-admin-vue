import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useProductAddOrEditDone = defineStore('productAddOrEditDone', () => {
  const productAddOrEditDone = ref(false)
  function setProductAddOrEditDone(data: boolean) {
    productAddOrEditDone.value = data
  }
  return { productAddOrEditDone, setProductAddOrEditDone }
})
