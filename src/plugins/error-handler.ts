import { type App } from 'vue'
import errorHandler from '@/error-handler'

export default {
  install(app: App) {
    app.config.errorHandler = errorHandler
  }
}
