import { type ComponentPublicInstance } from 'vue'

window.addEventListener('unhandledrejection', (e) => {
  if (import.meta.env.MODE === 'production') {
    e.preventDefault()
    // TODO 处理错误，例如：报告给一个服务
  }
})

export default (err: unknown, instance: ComponentPublicInstance | null, info: string) => {
  // TODO 处理错误，例如：报告给一个服务
  console.table(
    {
      err,
      instance,
      info
    },
    ['err', 'instance', 'info']
  )
}
