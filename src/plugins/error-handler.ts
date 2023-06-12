import { type App } from 'vue'
import errorHandler from '@/error-handler'

export default {
  install(app: App) {
    if (import.meta.env.MODE === 'production') app.config.errorHandler = errorHandler
  }
}
