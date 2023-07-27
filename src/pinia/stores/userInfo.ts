import { reactive } from 'vue'
import { defineStore } from 'pinia'
import type { UserType } from '@/types/user'

export const useUserInfo = defineStore('userInfo', () => {
  const userInfo = reactive<UserType>({
    _id: '',
    username: '',
    nickname: '',
    phone: null,
    avatar: '',
    profile: ''
  })
  function setUserInfo(info: Partial<UserType>) {
    Object.assign(userInfo, info)
  }
  return { userInfo, setUserInfo }
})
