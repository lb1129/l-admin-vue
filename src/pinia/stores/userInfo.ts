import { reactive } from 'vue'
import { defineStore } from 'pinia'

interface UserInfo {
  userName: string
}

export const useUserInfo = defineStore('userInfo', () => {
  const userInfo = reactive<UserInfo>({ userName: '' })
  function setUserInfo(info: UserInfo) {
    Object.assign(userInfo, info)
  }
  return { userInfo, setUserInfo }
})
