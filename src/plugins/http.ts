import { type App } from 'vue'
import http from '@/http'

export default {
  install(app: App) {
    app.config.globalProperties.$http = http
  }
}
