import { test } from './keys'

export const testSeesion = {
  get() {
    let result: string[]
    const value = sessionStorage.getItem(test)
    if (value) {
      try {
        result = JSON.parse(value)
      } catch (error) {
        result = []
      }
    } else {
      result = []
    }
    return result
  },
  set(value: string[]) {
    sessionStorage.setItem(test, JSON.stringify(value))
  },
  clear() {
    sessionStorage.removeItem(test)
  }
}
