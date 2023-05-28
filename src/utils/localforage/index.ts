import localforage from 'localforage'
import { testList } from './keys'

localforage.config({
  name: import.meta.env.VITE_SYSTEM_NAME,
  storeName: 'store'
})

export const testListLocalforage = {
  async get() {
    let result: string[]
    const value = await localforage.getItem(testList)
    if (typeof value === 'string') {
      try {
        result = JSON.parse(value)
      } catch (error) {
        result = []
      }
    } else result = []
    return result
  },
  async set(value: string[]) {
    return localforage.setItem(testList, JSON.stringify(value))
  },
  async clear() {
    return localforage.removeItem(testList)
  }
}
