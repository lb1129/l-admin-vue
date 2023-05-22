import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import errorHandlerPlugin from '@/plugins/errorHandler'

const app = createApp(App)

app.use(errorHandlerPlugin)
app.use(createPinia())
app.use(router)

app.mount('#app')
