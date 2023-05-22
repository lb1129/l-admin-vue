import { type ComponentPublicInstance } from 'vue'

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
