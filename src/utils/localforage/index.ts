import localforage from 'localforage'
import { token } from './keys'

localforage.config({
  name: import.meta.env.VITE_SYSTEM_NAME,
  storeName: 'store'
})

export const tokenLocalforage = {
  async get() {
    const value = await localforage.getItem<string>(token)
    return value ?? ''
  },
  async set(value: string) {
    return localforage.setItem(token, value)
  },
  async clear() {
    return localforage.removeItem(token)
  }
}
