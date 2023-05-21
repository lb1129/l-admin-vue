import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import errorHandler from './error-handler'

const app = createApp(App)

app.use(errorHandler)
app.use(createPinia())
app.use(router)

app.mount('#app')
