import { reactive } from 'vue'
import { defineStore } from 'pinia'

interface UserInfo {
  name: string
  nickname: string
  age: number
}

export const useUserInfo = defineStore('userInfo', () => {
  const userInfo = reactive<UserInfo>({ name: '', nickname: '', age: 0 })
  function updateUserInfo(info: UserInfo) {
    Object.assign(userInfo, info)
  }
  return { userInfo, updateUserInfo }
})
