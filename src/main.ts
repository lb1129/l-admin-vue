import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import errorHandlerPlugin from '@/plugins/error-handler'
import httpPlugin from '@/plugins/http'
import i18n from '@/i18n'
import pinia from '@/pinia'
import '@/assets/style/global.less'

const app = createApp(App)
// TODO 目录结构重构
// TODO 页面中的请求要抽取出server.ts模块
app.use(errorHandlerPlugin)
app.use(httpPlugin)
app.use(i18n)
app.use(pinia)
app.use(router)

app.mount('#app')
