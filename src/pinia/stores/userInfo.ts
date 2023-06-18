import { reactive } from 'vue'
import { defineStore } from 'pinia'
import type { UserInfoType } from '@/views/personal-center/types'

export const useUserInfo = defineStore('userInfo', () => {
  const userInfo = reactive<UserInfoType>({ userName: '' })
  function setUserInfo(info: UserInfoType) {
    Object.assign(userInfo, info)
  }
  return { userInfo, setUserInfo }
})
