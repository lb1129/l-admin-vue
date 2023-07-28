import { ref, onUnmounted, type Ref } from 'vue'

export const useCountDown: (firingValue: number) => [Ref<number>, () => void, () => void] = (
  firingValue: number
) => {
  const count = ref(0)
  let timer: number

  onUnmounted(() => {
    clearInterval(timer)
  })

  const run = () => {
    count.value = firingValue
    timer = window.setInterval(() => {
      --count.value
    }, 1000)
  }

  const reset = () => {
    count.value = 0
    clearInterval(timer)
  }

  return [count, run, reset]
}
