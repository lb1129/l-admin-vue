import { mergeConfig, defineConfig, loadEnv } from 'vite'
import viteBaseConfig from './vite.config.base'

export default mergeConfig(
  viteBaseConfig,
  // https://vitejs.dev/config/
  defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '')
    return {
      base: env.VITE_PUBLIC_URL
    }
  })
)
