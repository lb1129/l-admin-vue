import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import errorHandlerPlugin from '@/plugins/error-handler'
import httpPlugin from '@/plugins/http'
import i18n from '@/i18n'

const app = createApp(App)

app.use(errorHandlerPlugin)
app.use(httpPlugin)
app.use(i18n)
app.use(createPinia())
app.use(router)

app.mount('#app')
