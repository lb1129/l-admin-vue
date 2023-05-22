import { createPinia } from 'pinia'
import subscribe from './plugins/subscribe'

const pinia = createPinia()

pinia.use(subscribe)

export default pinia
