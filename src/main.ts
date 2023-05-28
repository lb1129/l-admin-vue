import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import errorHandlerPlugin from '@/plugins/error-handler'
import httpPlugin from '@/plugins/http'
import i18n from '@/i18n'
import pinia from '@/pinia'
import '@/assets/global.scss'
import '@/assets/transition.scss'

const app = createApp(App)

app.use(errorHandlerPlugin)
app.use(httpPlugin)
app.use(i18n)
app.use(pinia)
app.use(router)

app.mount('#app')
