import { defineConfig, loadEnv } from 'vite'
import viteBaseConfig from './vite.config.base'
import mockServer from 'vite-plugin-mock-server'
import bodyParser from 'body-parser'

// NOTE mergeConfig 对于 defineConfig(() => ({})) 合并无效
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const plugins = []
  if (mode === 'development') {
    plugins.push(
      mockServer({
        middlewares: [
          bodyParser.json(),
          bodyParser.urlencoded({ extended: false }),
          bodyParser.text(),
          bodyParser.raw()
        ]
      })
    )
  }
  return {
    base: env.VITE_PUBLIC_URL,
    ...viteBaseConfig,
    plugins: [...(viteBaseConfig.plugins ?? []), ...plugins]
  }
})
