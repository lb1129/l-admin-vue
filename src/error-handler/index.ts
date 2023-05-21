import { type App } from 'vue'

export default {
  install(app: App) {
    app.config.errorHandler = (err, instance, info) => {
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
  }
}
